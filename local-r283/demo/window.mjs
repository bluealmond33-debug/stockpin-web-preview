import {transition} from './shell.mjs';
const frame=document.querySelector('.preview-window');
const restore=document.querySelector('.preview-restore');
const expand=document.querySelector('[data-action="expand"]');
let state='open';
document.addEventListener('click',event=>{
 const button=event.target.closest('button[data-action]');
 if(!button)return;
 state=transition(state,button.dataset.action);
 frame.dataset.state=state;
 frame.hidden=state==='closed'||state==='minimized';
 restore.hidden=!frame.hidden;
 expand.setAttribute('aria-pressed',String(state==='expanded'));
 expand.setAttribute('aria-label',state==='expanded'?'프리뷰 원래 크기':'프리뷰 확대');
 expand.title=expand.getAttribute('aria-label');
 if(frame.hidden)restore.querySelector('button').focus();
 else if(button.dataset.action==='restore')expand.focus();
});
