import {escapeText,readView} from './view.mjs';
import {openStore} from './storage.mjs';
const main=document.querySelector('#content'), alert=document.querySelector('#alert');
const labels={assets:'내 자산',market:'시장',connections:'계좌 연결',journal:'매매일지'};
const pages={
 assets:'<h1>내 자산</h1><div class="metrics"><div><span class="quiet">전체 자산</span><p class="metric-value">—</p></div><div><span class="quiet">보유 종목</span><p class="metric-value">—</p></div></div><div class="empty"><h2>아직 조회한 자산이 없어요</h2><p class="quiet">금융 자료를 연결하지 않은 웹 초기 버전입니다.</p><button type="button" data-route="connections">계좌 연결 안내</button></div>',
 market:'<h1>시장</h1><p class="quiet">공급 미연결 · 현재값과 추이를 만들지 않습니다.</p><div class="market-list">'+['환율','비트코인 심리','VIX'].map(name=>`<div class="market-row"><div><p>${name}</p><p class="quiet">아직 불러오지 않음</p></div><span class="unknown">—</span></div>`).join('')+'</div>',
 connections:'<h1>계좌 연결</h1><div class="provider-list">'+['토스증권','키움증권'].map(name=>`<div class="provider-row"><p>${name}</p><span class="quiet">웹 연결 미지원</span></div>`).join('')+'</div><p class="quiet">이 버전에는 금융 키 입력·계좌 조회가 없습니다. 일지는 계좌 없이 사용할 수 있어요.</p>'+'<button type="button" data-route="journal">매매일지로</button>'
};
let domain,repo,notes=[],route='journal',mode='browse',draft=null,dirty=false,pending=false,photoBusy=false,current=null;
let query='',selectedDate='',filterOpen=false,calendarVisible=true,openEpoch=0;
let month=new Date().getMonth()+1,year=new Date().getFullYear();
const localDate=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
function showError(message=''){alert.hidden=!message;alert.textContent=message;}
function tools(){
 document.querySelector('#compose').disabled=!repo||pending||photoBusy;
 document.querySelector('#compose').hidden=mode==='edit';
 document.querySelector('#save-note').hidden=mode!=='edit';
 document.querySelector('#save-note').disabled=pending||photoBusy;
 document.querySelector('#edit-note').hidden=mode!=='read';
 document.querySelector('#back').hidden=mode==='browse';
 document.querySelector('#save-state').textContent=pending?'저장 중':dirty?'저장 전':'';
 if(mode==='edit')main.querySelectorAll('input,textarea,#add-photo,[data-remove]').forEach(control=>{control.disabled=pending;});
}
function canLeave(){
 if(pending){showError('저장이 끝난 뒤 이동해 주세요.');return false;}
 return !dirty||confirm('저장하지 않은 글이 있어요. 저장하지 않고 이동할까요?');
}
function setContext(next){
 route=next;document.body.dataset.route=next;document.querySelector('#context').textContent=labels[next];
 document.querySelectorAll('nav [data-route]').forEach(button=>{if(button.dataset.route===next)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
}
function navigate(next){
 if(!(next in labels)||!canLeave())return;
 openEpoch++;
 draft=null;current=null;dirty=false;photoBusy=false;mode='browse';showError();setContext(next);tools();
 if(next==='journal')renderJournal();else main.innerHTML=pages[next];
 main.focus();
}
function renderJournal(){
 if(!repo){main.innerHTML='<h1 class="sr-only">매매일지</h1><p class="quiet">'+(document.body.dataset.ready==='error'?'로컬 기록을 열지 못했습니다.':'기록을 불러오는 중')+'</p>';return;}
 main.innerHTML=`<h1 class="sr-only">매매일지</h1><div class="journal-tools"><h2>${year}.${String(month).padStart(2,'0')}</h2><button type="button" data-month="-1" aria-label="이전 달">←</button><button type="button" data-month="1" aria-label="다음 달">→</button><button type="button" id="calendar-toggle" aria-expanded="${calendarVisible}">${calendarVisible?'달력 접기':'달력 펼치기'}</button><button type="button" id="filter-toggle" aria-expanded="${filterOpen}">필터</button><label class="search"><span class="sr-only">일지 검색</span><input type="search" id="search" aria-label="일지 검색" placeholder="검색" value="${escapeText(query)}"></label></div><div id="filters" ${filterOpen?'':'hidden'}><label class="quiet">기록 날짜 <input type="date" id="filter-date" value="${escapeText(selectedDate)}"></label><button type="button" id="all-dates">모든 날짜</button></div><div id="calendar" ${calendarVisible?'':'hidden'}><div class="calendar-week">${['일','월','화','수','목','금','토'].map(x=>`<span>${x}</span>`).join('')}</div><div class="calendar-days">${domain.listMonthDays(year,month).map(date=>date?`<button type="button" data-date="${date}" aria-label="${date}" aria-pressed="${selectedDate===date}" class="${selectedDate===date?'selected ':''}${notes.some(n=>n.date===date)?'has-note':''}">${Number(date.slice(-2))}</button>`:'<span></span>').join('')}</div></div><div class="note-list" id="note-list"></div>`;
 renderList();
}
function renderList(){
 const list=document.querySelector('#note-list');if(!list)return;
 const found=domain.filterNotes(notes,{query,date:selectedDate});
 list.innerHTML=found.length?found.map(n=>`<button type="button" class="note-item" data-note="${n.id}"><time datetime="${n.date}">${n.date.slice(5).replace('-','.')}</time><span><strong>${escapeText(n.title)}</strong><small>${escapeText(n.body.slice(0,100))}</small></span></button>`).join(''):`<div class="empty"><p class="quiet">${query||selectedDate?'조건에 맞는 기록이 없어요.':'아직 작성한 기록이 없어요.'}</p></div>`;
}
function updateDraft(){
 if(!draft)return;draft.title=document.querySelector('#note-title').value;draft.date=document.querySelector('#note-date').value;draft.body=document.querySelector('#note-body').value;dirty=true;tools();
}
function openEditor(note=null){
 if(!repo||!canLeave())return;
 openEpoch++;
 setContext('journal');mode='edit';showError();dirty=false;current=note;
 draft=note?structuredClone(note):{id:crypto.randomUUID(),date:selectedDate||localDate(),title:'',body:'',images:[]};
 main.innerHTML=`<section class="editor" aria-label="일지 작성"><h1 class="sr-only">일지 작성</h1><label class="sr-only" for="note-title">제목</label><input id="note-title" class="editor-title" maxlength="200" placeholder="제목" value="${escapeText(draft.title)}"><label class="quiet">기록 날짜 <input id="note-date" type="date" value="${escapeText(draft.date)}"></label><label class="sr-only" for="note-body">본문</label><textarea id="note-body" maxlength="100000" placeholder="기록을 남겨보세요.">${escapeText(draft.body)}</textarea><div class="photo-tools"><button type="button" id="add-photo">사진 추가</button><input id="photo-file" type="file" accept="image/png,image/jpeg,image/webp" hidden multiple></div><div id="photos" class="photos"></div></section>`;
 tools();renderPhotos();document.querySelector('#note-title').focus();
}
function renderPhotos(){
 const box=document.querySelector('#photos');if(!box||!draft)return;
 box.innerHTML=draft.images.map(image=>`<figure class="photo-item"><img src="${escapeText(image.dataUrl)}" alt="${escapeText(image.name)}"><figcaption>${escapeText(image.name)} <button type="button" data-remove="${image.id}" aria-label="${escapeText(image.name)} 사진 삭제">삭제</button></figcaption></figure>`).join('');
}
async function addPhotos(files){
 const owner=draft;if(!owner||photoBusy||pending)return;
 photoBusy=true;tools();showError();
 try{
  if(owner.images.length+files.length>4)throw new Error('사진은 최대 4장까지 추가할 수 있어요.');
  const staged=[];
  for(const file of files){
   if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1000000)throw new Error('PNG·JPEG·WebP, 1MB 이하 사진을 선택해 주세요.');
   const dataUrl=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('사진을 읽지 못했습니다.'));reader.readAsDataURL(file);});
   const image=new Image();image.src=dataUrl;await image.decode();
   if(image.naturalWidth>4096||image.naturalHeight>4096||image.naturalWidth*image.naturalHeight>8000000)throw new Error('사진 크기를 줄여 다시 선택해 주세요.');
   staged.push({id:crypto.randomUUID(),name:file.name,type:file.type,dataUrl});
  }
  if(draft===owner){owner.images.push(...staged);dirty=true;renderPhotos();}
 }catch(e){if(draft===owner)showError(e.message||'사진을 추가하지 못했습니다.');}
 finally{if(draft===owner){photoBusy=false;const input=document.querySelector('#photo-file');if(input)input.value='';tools();}}
}
function showNote(note){
 draft=null;current=note;dirty=false;mode='read';setContext('journal');tools();main.innerHTML=readView(note);main.querySelector('h1').focus();
}
async function save(){
 if(!draft||pending||photoBusy)return;
 updateDraft();const owner=draft;pending=true;tools();showError();
 try{
  const candidate=domain.createNote({id:owner.id,date:owner.date,title:owner.title,body:owner.body,images:owner.images,now:new Date().toISOString()});
  if(current){candidate.createdAt=current.createdAt;candidate.revision=current.revision+1;}
  const saved=await repo.save(candidate,current?.revision??null);
  notes=[...notes.filter(n=>n.id!==saved.id),saved];
  showNote(saved);
 }catch(e){showError('저장하지 못했습니다. 작성 내용은 그대로 유지됩니다. '+(e.message||''));}
 finally{pending=false;tools();}
}
async function openNote(id){
 if(!canLeave())return;
 const epoch=++openEpoch;
 try{const latest=await repo.load();if(epoch!==openEpoch)return;const note=latest.find(n=>n.id===id);if(!note)throw new Error('기록을 찾지 못했습니다.');notes=latest;showError();showNote(note);}catch(e){if(epoch===openEpoch)showError('기록을 열지 못했습니다. '+(e.message||''));}
}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.route){navigate(button.dataset.route);return;}
 if(button.dataset.note){void openNote(button.dataset.note);return;}
 if(button.dataset.date){selectedDate=selectedDate===button.dataset.date?'':button.dataset.date;renderJournal();return;}
 if(button.dataset.month){month+=Number(button.dataset.month);if(month===0){year--;month=12;}if(month===13){year++;month=1;}renderJournal();return;}
 if(button.dataset.remove&&draft&&!pending&&!photoBusy){draft.images=draft.images.filter(x=>x.id!==button.dataset.remove);dirty=true;renderPhotos();tools();return;}
 const id=button.id;
 if(id==='compose')openEditor();
 if(id==='back')navigate('journal');
 if(id==='save-note')void save();
 if(id==='edit-note')openEditor(current);
 if(id==='add-photo'&&!pending&&!photoBusy)document.querySelector('#photo-file').click();
 if(id==='calendar-toggle'){calendarVisible=!calendarVisible;renderJournal();}
 if(id==='filter-toggle'){filterOpen=!filterOpen;renderJournal();}
 if(id==='all-dates'){selectedDate='';renderJournal();}
 if(id==='settings-open')document.querySelector('#settings').showModal();
 if(id==='settings-close')document.querySelector('#settings').close();
});
document.addEventListener('input',event=>{
 if(['note-title','note-date','note-body'].includes(event.target.id))updateDraft();
 if(event.target.id==='search'){query=event.target.value;renderList();}
});
document.addEventListener('change',event=>{
 if(event.target.id==='photo-file')void addPhotos([...event.target.files]);
 if(event.target.id==='filter-date'){selectedDate=event.target.value;renderJournal();}
});
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();navigate('journal');});
window.addEventListener('beforeunload',event=>{if(dirty||pending){event.preventDefault();event.returnValue='';}});
const startupEpoch=openEpoch;
let openingRepo;
try{
 domain=await import('./journal.mjs');openingRepo=await openStore({validateNote:domain.validateNote,upsertNote:domain.upsertNote});const loaded=await openingRepo.load();
 repo=openingRepo;notes=loaded;document.body.dataset.ready='true';
 if(openEpoch===startupEpoch)navigate('journal');else{tools();if(route==='journal')renderJournal();}
}catch(e){openingRepo?.close();repo=null;document.body.dataset.ready='error';tools();if(route==='journal')renderJournal();showError('브라우저 저장소를 열지 못했습니다. 기존 기록은 변경하지 않았습니다.');}
