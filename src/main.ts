import {desk} from "@shared/desk";
import {wrap,label,type Frame} from "@shared/surface";
let masks=[["00100","01110","11111","00100","00100"],["00010","00111","01111","00010","00010"]];
desk({name:"Light Table",accent:"#B695F0",motion:{enabled:false},initial:()=>({x:0,y:0,axis:0,mode:0}),configure:(_,v)=>{
 for(const [i,k] of ["first","second"].entries()){const a=String(v[k]||"").split("/");if(a.length<=7&&a.every(row=>/^[01]{1,12}$/.test(row)))masks[i]=a;}},
 render:s=>{const art:Frame=[];let overlap=0;const grid:string[]=[];
 for(let y=0;y<8;y++){
  let row="";
  for(let x=0;x<20;x++){
   const ax=x-3,ay=y-1,a=masks[0][ay]?.[ax]==="1",b=masks[1][ay-s.y]?.[ax-s.x]==="1";
   if(a&&b)overlap++;
   const visibleA=a&&s.mode!==2,visibleB=b&&s.mode!==1;
   const color=visibleA&&visibleB?"X":visibleA?"A":visibleB?"B":".";
   row+=color+color+color;
  }
  grid.push(row,row);
 }
 const data=["! XPM2","60 16 4 1",". c none","A c #F7AA62","B c #64CCBD","X c #FFF4D9",...grid].join("\n");
 art.push({id:"overlay",type:"xpmbitmap",data,x:2,y:0,align:"top_left",display:"front"});
 art.push(label("axis",s.axis?"Y":"X",65,2,"#E4B598FF","front","tiny"));return {title:"Overlay",value:"",art,lines:[["Overlay","Reference","Moving mask"][s.mode],"X "+s.x+" / Y "+s.y,"Overlap "+overlap+" pixels","Wheel: shift / Click: axis","Start: isolate a layer","Hold Start: zero offset"]};},
 action:(s,k)=>{if(k==="ok")s.axis=1-s.axis;if(k==="start")s.mode=wrap(s.mode+1,3);if(k==="hold-start"){s.x=0;s.y=0;}
 if(k==="up"||k==="down"){const d=k==="up"?1:-1;if(s.axis)s.y=Math.max(-6,Math.min(6,s.y+d));else s.x=Math.max(-10,Math.min(10,s.x+d));}}});
