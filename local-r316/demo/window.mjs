import {transition} from './shell.mjs';
import {initialRect,clampRect,expandedRect,moveRect,resizeRect,centerRect} from './geometry.mjs';
const frame=document.querySelector('.preview-window');
frame.dataset.desktopEngine='20b';
const restore=document.querySelector('.preview-restore');
const expand=document.querySelector('[data-action="expand"]');
const caption=document.querySelector('.preview-caption');
const viewport=()=>({width:document.documentElement.clientWidth,height:window.innerHeight});
let state='open', normal=initialRect(viewport()), rect=normal, gesture=null;
let reserve=64, settleTimer;
function stopSettling(){ clearTimeout(settleTimer); document.body.classList.remove("desktop-settling"); }
// Only shell siblings are added. The existing iframe and its document stay untouched.
const strip=document.createElement('button');
strip.type='button';strip.className='desktop-drag-strip';
strip.setAttribute('aria-label','앱 창 이동 · 방향키로 이동, 두 번 클릭하여 확대 또는 복귀');
strip.title='창 이동 · 방향키 / 두 번 클릭하여 확대';
frame.append(strip);
const handles=[];
for(const direction of ['n','ne','e','se','s','sw','w','nw']){
 const handle=document.createElement(direction==='se'?'button':'span');
 handle.className=`desktop-resize desktop-resize-${direction}`;handle.dataset.direction=direction;
 if(direction==='se'){
  handle.type='button';handle.setAttribute('aria-label','앱 창 크기 조절');
  handle.setAttribute('aria-description','좌우 방향키: 너비, 위아래 방향키: 높이. Shift 키: 크게 조절.');
  handle.title='창 크기 조절 · 방향키 (Shift: 크게)';
 }else handle.setAttribute('aria-hidden','true');
 frame.append(handle);handles.push(handle);
}
const shield=document.createElement('div');shield.className='desktop-pointer-shield';shield.hidden=true;
shield.setAttribute('aria-hidden','true');document.body.append(shield);
function paint(){
 const hidden=state==='closed'||state==='minimized';
 frame.dataset.state=state;frame.hidden=hidden;restore.hidden=!hidden;caption.hidden=hidden;
 strip.disabled=state!=='open'&&state!=='expanded';
 for(const h of handles)h.hidden=state!=='open';
 expand.setAttribute('aria-pressed',String(state==='expanded'));
 expand.setAttribute('aria-label',state==='expanded'?'프리뷰 원래 크기':'프리뷰 확대');expand.title=expand.getAttribute('aria-label');
 caption.style.width=`${rect.width}px`;
 if(!hidden)reserve=Math.max(64,caption.getBoundingClientRect().height+24);
 normal=clampRect(normal,viewport(),reserve);
 rect=state==='expanded'?expandedRect(viewport(),reserve):normal;
 for(const [key,value] of Object.entries({left:rect.x,top:rect.y,width:rect.width,height:rect.height}))frame.style[key]=`${value}px`;
 caption.style.left=`${rect.x}px`;caption.style.top=`${rect.y+rect.height+14}px`;caption.style.width=`${rect.width}px`;
}
function finish(cancel=false){
 if(!gesture)return;
 const old=gesture;gesture=null;
 if(cancel)normal=clampRect(old.rect,viewport(),reserve);
 try{if(old.target.hasPointerCapture(old.id))old.target.releasePointerCapture(old.id);}catch{}
 shield.hidden=true;document.body.classList.remove('desktop-manipulating');
 if(!cancel&&old.direction){
  normal=centerRect(normal,viewport(),reserve);
  document.body.classList.add('desktop-settling');
  settleTimer=setTimeout(stopSettling,320);
 }
 paint();
}
function action(name,button){
 finish();stopSettling();state=transition(state,name);paint();
 if(frame.hidden)restore.querySelector('button').focus();
 else if(name==='restore')expand.focus();
 else if(button&&button.hidden)expand.focus();
}
document.addEventListener('click',event=>{
 const button=event.target.closest?.('button[data-action]');
 if(!button||(!frame.contains(button)&&!restore.contains(button)))return;
 action(button.dataset.action,button);
});
strip.addEventListener('dblclick',()=>action('expand'));
function start(event,direction){
 if(event.button!==0||!event.isPrimary||state!=='open'||gesture)return;
 event.preventDefault();
 if(document.body.classList.contains("desktop-settling")){ const shown=frame.getBoundingClientRect(); normal=clampRect({x:shown.left,y:shown.top,width:shown.width,height:shown.height},viewport(),reserve);stopSettling();paint(); }
 const target=event.currentTarget;
 gesture={id:event.pointerId,target,direction,x:event.clientX,y:event.clientY,rect:{...normal}};
 try{target.setPointerCapture(event.pointerId);}catch{gesture=null;return;}
 // Capture plus a temporary parent-document shield keeps iframe crossings continuous.
 // No iframe pointer-events/source/style mutation needs restoration.
 shield.hidden=false;shield.style.cursor=direction?`${direction}-resize`:'grabbing';
 document.body.classList.add('desktop-manipulating');
}
strip.addEventListener('pointerdown',e=>start(e,''));
for(const h of handles)h.addEventListener('pointerdown',e=>start(e,h.dataset.direction));
document.addEventListener('pointermove',event=>{
 const g=gesture;if(!g||event.pointerId!==g.id)return;
 if(!(event.buttons&1)){finish();return;}
 event.preventDefault();const dx=event.clientX-g.x,dy=event.clientY-g.y;
 normal=g.direction?resizeRect(g.rect,g.direction,dx,dy,viewport(),reserve):moveRect(g.rect,dx,dy,viewport(),reserve);paint();
},{passive:false});
document.addEventListener('pointerup',e=>{if(gesture?.id===e.pointerId)finish();});
document.addEventListener('pointercancel',e=>{if(gesture?.id===e.pointerId)finish(true);});
// WebKit can drop capture during live iframe resizing while the button is held.
// The desktop shield still delivers document moves/up; preserve that real drag.
for(const h of [strip,...handles])h.addEventListener('lostpointercapture',e=>{if(gesture?.id===e.pointerId&&!(e.buttons&1))finish();});
window.addEventListener('blur',()=>finish(true));
document.addEventListener('visibilitychange',()=>{if(document.hidden)finish(false);});
window.addEventListener('pagehide',()=>finish(true));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&gesture){e.preventDefault();finish(true);}});
function keyboard(event,resize){
 if(state!=='open')return;
 const steps={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
 const step=steps[event.key];if(!step)return;
 event.preventDefault();finish();const amount=event.shiftKey?32:8;
 normal=resize?resizeRect(normal,'se',step[0]*amount,step[1]*amount,viewport(),reserve):moveRect(normal,step[0]*amount,step[1]*amount,viewport(),reserve);paint();
}
strip.addEventListener('keydown',e=>keyboard(e,false));
handles.find(h=>h.dataset.direction==='se').addEventListener('keydown',e=>keyboard(e,true));
window.addEventListener('resize',()=>{finish();paint();});
// Caption text is owned by the parent; observe wrapping without changing its content.
new ResizeObserver(()=>paint()).observe(caption);
paint();
