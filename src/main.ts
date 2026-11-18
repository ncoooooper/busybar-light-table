import {desk} from "@shared/desk";
import {wrap,rect,label,type Frame} from "@shared/surface";
let masks=[["00100","01110","11111","00100","00100"],["00010","00111","01111","00010","00010"]];
desk({name:"Light Table",accent:"#B695F0",motion:{"motif":"shuttle","color":"#B695F0","shine":"#F8E8FF"},initial:()=>({x:0,y:0,axis:0,mode:0}),configure:(_,v)=>{
 for(const [i,k] of ["first","second"].entries()){const a=String(v[k]||"").split("/");if(a.length<=7&&a.every(row=>/^[01]{1,12}$/.test(row)))masks[i]=a;}},
 render:s=>{const art:Frame=[];let overlap=0;
 for(let y=0;y<8;y++)for(let x=0;x<20;x++){const ax=x-3,ay=y-1;const a=masks[0][ay]?.[ax]==="1",b=masks[1][ay-s.y]?.[ax-s.x]==="1";
 if(a&&b)overlap++;if((s.mode===0&&(a||b))||(s.mode===1&&a)||(s.mode===2&&b))art.push(rect("p"+x+"-"+y,2+x*3,y*2,3,2,a&&b&&s.mode===0?"#FFF4D9FF":a&&s.mode!==2?"#F7AA62FF":"#64CCBDFF"));}
 art.push(label("axis",s.axis?"Y":"X",65,2,"#E4B598FF","front","tiny"));return {title:"Overlay",value:"",art,lines:[["Overlay","Reference","Moving mask"][s.mode],"X "+s.x+" / Y "+s.y,"Overlap "+overlap+" pixels","Wheel: shift / Click: axis","Start: isolate a layer","Hold Start: zero offset"]};},
 action:(s,k)=>{if(k==="ok")s.axis=1-s.axis;if(k==="start")s.mode=wrap(s.mode+1,3);if(k==="hold-start"){s.x=0;s.y=0;}
 if(k==="up"||k==="down"){const d=k==="up"?1:-1;if(s.axis)s.y=Math.max(-6,Math.min(6,s.y+d));else s.x=Math.max(-10,Math.min(10,s.x+d));}}});
