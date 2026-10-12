let step=0,timer=null;
const $=s=>document.querySelector(s);
const explanations=[
 'Preparado: A contiene 3 (0011). En memoria está la instrucción «sumar 2 a A».',
 'Buscar: el control lee la instrucción situada en la dirección del contador de programa. Aquí solo mostramos una instrucción.',
 'Decodificar: el circuito reconoce la suma, selecciona A y el operando inmediato 2 (0010).',
 'Ejecutar: el sumador de la ALU produce 0101 (5). A todavía conserva 0011: calcular y guardar son acciones distintas.',
 'Guardar: el registro A captura 0101 (5). El control puede continuar con la siguiente instrucción.'
];
function draw(){
 const s=state(step); $('#phase').textContent=s.stage+' · A = '+s.register.toString(2).padStart(4,'0')+' ('+s.register+')';
 $('#explanation').textContent=explanations[step];
 document.querySelectorAll('.bank').forEach(el=>el.classList.toggle('active',el.id===(['register','memory','control','control','register'][step])));
 document.querySelectorAll('[data-bit]').forEach(el=>{const [id,bit]=el.dataset.bit.split('-');const n=id==='register'?s.register:id==='memory'?2:step>=3?5:0;el.style.opacity=(n>>Number(bit))&1?'1':'.25';});
 document.querySelectorAll('[data-position]').forEach(el=>el.style.opacity=Number(el.dataset.position)===step?'1':'.25');
 $('#back').disabled=step===0;$('#next').disabled=step===4;
}
function stop(){clearInterval(timer);timer=null;$('#play').textContent='Recorrido automático';$('#play').setAttribute('aria-pressed','false');}
$('#next').onclick=()=>{stop();step=Math.min(4,step+1);draw();};
$('#back').onclick=()=>{stop();step=Math.max(0,step-1);draw();};
$('#reset').onclick=()=>{stop();step=0;draw();};
$('#play').onclick=()=>{if(timer){stop();return;}if(step===4)step=0;draw();$('#play').textContent='Pausar';$('#play').setAttribute('aria-pressed','true');timer=setInterval(()=>{step++;draw();if(step===4)stop();},2500);};
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();}).observe($('.card'));
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
let on=false;$('#toggle').onclick=()=>{on=!on;$('#toggle').setAttribute('aria-pressed',String(on));$('#toggle').textContent=on?'Retirar tensión de la puerta':'Aplicar tensión a la puerta';$('#gate').textContent='Puerta: tensión '+(on?'suficiente':'baja');$('#channel').textContent=on?'Canal conductor':'Canal no conductor';$('.transistor').classList.toggle('on',on);$('#transistor-text').textContent=on?'El campo de la puerta forma un canal. Si hay una diferencia de tensión entre fuente y drenador, puede circular corriente.':'Sin suficiente tensión entre puerta y fuente, este nMOS no forma un canal conductor útil. En la realidad puede existir una pequeña corriente de fuga.';};
$('#bits').innerHTML=addBits(3,2).map((b,i)=>'<tr>'+[i+' (peso '+(1<<i)+')',b.x,b.y,b.incoming,b.sum,b.carry].map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');draw();
