export function decodeState(value, validateNote) {
  if (value === undefined) return {schema:1,notes:[]};
  if (!value || typeof value !== 'object' || Object.keys(value).sort().join(',') !== 'notes,schema' || value.schema !== 1 || !Array.isArray(value.notes) || value.notes.length > 2000) throw new Error('이 브라우저의 기록 형식을 확인할 수 없습니다. 원본은 변경하지 않았습니다.');
  const ids = new Set();
  for (const note of value.notes) {
    if (!validateNote(note) || ids.has(note.id)) throw new Error('이 브라우저의 기록을 확인할 수 없습니다. 원본은 변경하지 않았습니다.');
    ids.add(note.id);
  }
  return structuredClone(value);
}

export async function openStore({factory = globalThis.indexedDB, validateNote, upsertNote}) {
  if (!factory) throw new Error('이 브라우저에서 로컬 저장을 사용할 수 없습니다.');
  const db = await new Promise((resolve,reject) => {
    const req = factory.open('stockpin-web-preview-v1',1);
    req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains('journal')) req.result.createObjectStore('journal'); };
    req.onerror = () => reject(req.error ?? new Error('로컬 저장소를 열지 못했습니다.'));
    req.onblocked = () => reject(new Error('다른 창의 저장 작업을 확인해 주세요.'));
    req.onsuccess = () => resolve(req.result);
  });
  const transact = (note,expectedRevision) => new Promise((resolve,reject) => {
    const tx = db.transaction('journal', note ? 'readwrite' : 'readonly');
    const bucket = tx.objectStore('journal');
    const req = bucket.get('state');
    let result, failure;
    req.onsuccess = () => {
      try {
        const state = decodeState(req.result,validateNote);
        if (note) {
          const notes = upsertNote(state.notes,note,{expectedRevision});
          // The imported domain upsert has validated old and incoming notes,
          // revisions, IDs and createdAt. Do not scan/clone the whole set again.
          if (!Array.isArray(notes) || notes.length > 2000) throw new Error('이 브라우저의 기록 개수 한도에 도달했습니다.');
          bucket.put({schema:1,notes},'state');
          result = structuredClone(notes.find(n=>n.id===note.id));
        } else result = state.notes;
      } catch (e) { failure=e; tx.abort(); }
    };
    req.onerror = () => {failure=req.error;};
    tx.oncomplete = () => resolve(result);
    tx.onabort = tx.onerror = () => reject(failure ?? tx.error ?? new Error('로컬 저장을 완료하지 못했습니다.'));
  });
  return {load:()=>transact(),save:(note,expectedRevision)=>transact(note,expectedRevision),close:()=>db.close()};
}
