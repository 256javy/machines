import {writeFileSync,readFileSync} from 'node:fs';
import * as k from './vendor/anatomy/iso-kit.mjs';
const P=k.fitProjection(k.boxCorners({x:-150,y:-90,w:300,d:180,r:8},-12,42),760,420,{pad:35,azimuth:42});
const solid=(plan,z,h,tone='mid')=>k.solidSvg(k.slabOf(plan,z,h,P,4,.7),{tone});
let body='';
for(const x of [-130,130])for(const y of [-70,70])body+=solid({x:x-8,y:y-8,w:16,d:16,r:3},-12,6,'lo');
body+=solid({x:-150,y:-90,w:300,d:180,r:8},-6,6,'lo');
for(const x of [-140,134])for(const y of [-80,74])body+=solid({x,y,w:6,d:6,r:2},0,1,'lo');
const banks=[{x:-130,y:-65},{x:-40,y:-65},{x:50,y:-65}].sort((a,b)=>k.depthOf([a.x,a.y,0],P)-k.depthOf([b.x,b.y,0],P));
for(const pos of banks){
 const id=pos.x===-130?'memory':pos.x===-40?'control':'register';
 body+=`<g id="${id}" class="bank">`+solid({...pos,w:76,d:94,r:4},0,8);
 for(const y of [pos.y+5,pos.y+83])body+=solid({x:pos.x+5,y,w:66,d:5,r:1},8,3,'lo');
 for(const x of [pos.x+3,pos.x+68])for(const y of [pos.y+3,pos.y+86])body+=solid({x,y,w:4,d:4,r:1},8,2,'lo');
 for(let i=0;i<4;i++){
 body+=solid({x:pos.x+8+i*15,y:pos.y+25,w:12,d:40,r:2},8,6);
 body+=`<g data-bit="${id}-${3-i}">`+solid({x:pos.x+10+i*15,y:pos.y+29,w:8,d:32,r:1},14,1,'hi')+'</g>';
 }
 body+='</g>';
}
body+=solid({x:-90,y:50,w:180,d:24,r:4},0,6);
body+=solid({x:-85,y:53,w:170,d:18,r:2},6,2);
for(let i=0;i<5;i++)body+=`<g data-position="${i}">`+solid({x:-76+i*33,y:56,w:20,d:12,r:2},8,4,'hi')+'</g>';
const svg=k.figureSvg({width:760,height:420,label:'Calculadora didáctica de cuatro bits: tres bancos y un selector de fases.',body});
const runtime=readFileSync('live.js','utf8');
const content=readFileSync('content.html','utf8');
writeFileSync('index.html',`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dentro de un procesador — Machines</title><style>${k.ISO_CSS}\n${readFileSync('style.css','utf8')}</style><body class="iso" data-theme="light"><main>${content.replace('<!--FIGURE-->',svg)}</main><script type="module">import {state,addBits} from './model.mjs';\n${runtime}</script></body></html>`);
console.log('Generado index.html: 61 sólidos');
