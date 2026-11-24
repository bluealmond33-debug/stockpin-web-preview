const bound=(n,lo,hi)=>Math.min(hi,Math.max(lo,n));
export function limits(viewport,captionReserve=64){
 const width=Math.max(0,viewport.width),height=Math.max(0,viewport.height);
 const left=Math.min(12,width/2),top=Math.min(12,height/2);
 const right=Math.max(left,width-left),bottom=Math.max(top,height-Math.min(captionReserve,height-top));
 return {left,top,right,bottom,minWidth:Math.min(720,right-left),minHeight:Math.min(240,bottom-top)};
}
export function clampRect(rect,viewport,reserve=64){
 const b=limits(viewport,reserve);
 const width=bound(rect.width,b.minWidth,b.right-b.left),height=bound(rect.height,b.minHeight,b.bottom-b.top);
 return {x:bound(rect.x,b.left,b.right-width),y:bound(rect.y,b.top,b.bottom-height),width,height};
}
export function initialRect(viewport,reserve=64){
 const b=limits(viewport,reserve);
 const width=Math.min(1120,viewport.width*.6875,Math.max(0,viewport.height-170)*1.6,b.right-b.left);
 return clampRect({x:(viewport.width-width)/2,y:48,width,height:width/1.6},viewport,reserve);
}
export function expandedRect(viewport,reserve=64){
 const b=limits(viewport,reserve);return {x:b.left,y:b.top,width:b.right-b.left,height:b.bottom-b.top};
}
export function moveRect(rect,dx,dy,viewport,reserve=64){return clampRect({...rect,x:rect.x+dx,y:rect.y+dy},viewport,reserve);}
export function resizeRect(rect,direction,dx,dy,viewport,reserve=64){
 const b=limits(viewport,reserve),r=clampRect(rect,viewport,reserve);
 let left=r.x,right=r.x+r.width,top=r.y,bottom=r.y+r.height;
 if(direction.includes('w'))left=bound(left+dx,b.left,right-b.minWidth);
 if(direction.includes('e'))right=bound(right+dx,left+b.minWidth,b.right);
 if(direction.includes('n'))top=bound(top+dy,b.top,bottom-b.minHeight);
 if(direction.includes('s'))bottom=bound(bottom+dy,top+b.minHeight,b.bottom);
 return {x:left,y:top,width:right-left,height:bottom-top};
}

export function centerRect(rect,viewport,reserve=64){
 return clampRect({...rect,x:(viewport.width-rect.width)/2,y:(viewport.height-rect.height)/2},viewport,reserve);
}
