const NOTE_KEYS = ['id', 'date', 'title', 'body', 'images', 'createdAt', 'updatedAt', 'revision'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const text = (v, max) => typeof v === 'string' && v.length <= max;
function record(v, keys) {
  return v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype
    && Reflect.ownKeys(v).length === keys.length
    && keys.every(k => Object.hasOwn(v, k) && 'value' in Object.getOwnPropertyDescriptor(v, k));
}
function realDate(v) {
  if (typeof v !== 'string' || !/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + 'T00:00:00.000Z');
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
function canonicalISO(v) {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v)) return false;
  const d = new Date(v);
  return realDate(v.slice(0, 10)) && Number.isFinite(d.getTime()) && d.toISOString() === v;
}
export function isCanonicalBase64(payload) {
  if (typeof payload !== 'string' || !payload || payload.length > 1500000 || payload.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)) return false;
  const padding = payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0;
  if (!padding) return true;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  return alphabet.indexOf(payload[payload.length-padding-1]) % (padding === 2 ? 16 : 4) === 0;
}

function validImages(images) {
  if (!Array.isArray(images) || images.length > 4 || Reflect.ownKeys(images).length !== images.length + 1) return false;
  for (let i = 0; i < images.length; i++) {
    const descriptor = Object.getOwnPropertyDescriptor(images, String(i));
    if (!descriptor || !('value' in descriptor)) return false;
    const v = descriptor.value;
    if (!record(v, ['id', 'name', 'type', 'dataUrl']) || typeof v.id !== 'string' || !UUID.test(v.id)
      || !text(v.name, 200) || !['image/png', 'image/jpeg', 'image/webp'].includes(v.type)
      || !text(v.dataUrl, 1500000)) return false;
    const prefix = `data:${v.type};base64,`;
    if (!v.dataUrl.startsWith(prefix)) return false;
    const payload = v.dataUrl.slice(prefix.length);
    if (!isCanonicalBase64(payload)) return false;
  }
  return true;
}
export function validateNote(v) {
  try {
    return isValidNote(v);
  } catch {
    return false;
  }
}
function isValidNote(v) {
  return record(v, NOTE_KEYS) && typeof v.id === 'string' && UUID.test(v.id)
    && realDate(v.date) && text(v.title, 200) && !/[\u0000-\u001f\u007f-\u009f]/.test(v.title)
    && text(v.body, 100000) && validImages(v.images)
    && canonicalISO(v.createdAt) && canonicalISO(v.updatedAt)
    && Number.isSafeInteger(v.revision) && v.revision > 0;
}
export function listMonthDays(year, month) {
  if (!Number.isInteger(year) || year < 1 || year > 9999 || !Number.isInteger(month) || month < 1 || month > 12) throw new RangeError('Invalid year or month');
  const prefix = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-`;
  const leading = new Date(prefix + '01T00:00:00.000Z').getUTCDay();
  const result = Array(leading).fill(null);
  for (let day = 1; day <= 31; day++) {
    const date = prefix + String(day).padStart(2, '0');
    if (!realDate(date)) break;
    result.push(date);
  }
  return result;
}

export function filterNotes(notes, { query = '', date = '' } = {}) {
  const needle = query.toLowerCase();
  const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  return notes.filter(note => (!date || note.date === date)
    && (note.title.toLowerCase().includes(needle) || note.body.toLowerCase().includes(needle)))
    .sort((a, b) => compare(b.date, a.date) || compare(b.updatedAt, a.updatedAt) || compare(a.id, b.id));
}

export function upsertNote(notes, note, { expectedRevision }) {
  if (!Array.isArray(notes) || !notes.every(validateNote) || !validateNote(note)
    || new Set(notes.map(n => n.id)).size !== notes.length) throw new TypeError('Invalid notes');
  const index = notes.findIndex(n => n.id === note.id);
  if (index === -1) {
    if (expectedRevision !== null || note.revision !== 1) throw new Error('Revision conflict');
  } else {
    const old = notes[index];
    if (expectedRevision !== old.revision || note.revision !== old.revision + 1
      || note.createdAt !== old.createdAt) throw new Error('Revision conflict');
  }
  const saved = { ...note, images: note.images.map(image => ({ ...image })) };
  return index === -1 ? [...notes, saved] : notes.map((n, i) => i === index ? saved : n);
}

export function createNote(value) {
  const keys = ['id', 'date', 'title', 'body', 'now'];
  if (!record(value, Object.hasOwn(value ?? {}, 'images') ? [...keys, 'images'] : keys)) throw new TypeError('Invalid createNote fields');
  const { id, date, title, body, images = [], now } = value;
  const note = { id, date, title, body, images, createdAt: now, updatedAt: now, revision: 1 };
  if (!validateNote(note)) throw new TypeError('Invalid note');
  return { ...note, images: images.map(image => ({ ...image })) };
}
