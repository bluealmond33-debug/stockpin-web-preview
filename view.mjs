export function escapeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

export function readView(note) {
  const images = (note.images ?? []).map(image => {
    if (!['image/png','image/jpeg','image/webp'].includes(image.type) || !image.dataUrl.startsWith(`data:${image.type};base64,`) || !/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(image.dataUrl)) throw new Error('지원하지 않는 사진 형식입니다.');
    return `<figure><img src="${escapeText(image.dataUrl)}" alt="${escapeText(image.name)}"><figcaption>${escapeText(image.name)}</figcaption></figure>`;
  }).join('');
  return `<article class="note-read"><h1 tabindex="-1">${escapeText(note.title)}</h1><p class="note-date"><time datetime="${escapeText(note.date)}">${escapeText(note.date)}</time></p><div class="note-body">${escapeText(note.body)}</div>${images}</article>`;
}
