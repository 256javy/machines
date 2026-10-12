import {test} from 'node:test';
import assert from 'node:assert/strict';
import {state,addBits} from './model.mjs';
test('El registro solo cambia al guardar',()=>{assert.equal(state(3).register,3);assert.equal(state(4).register,5);assert.equal(state(2).result,null);});
test('El sumador conserva suma y acarreo para todas las entradas de cuatro bits',()=>{
 for(let a=0;a<16;a++)for(let b=0;b<16;b++){
 const bits=addBits(a,b); const value=bits.reduce((n,bit,i)=>n+(bit.sum<<i),0)+(bits[3].carry<<4);
 assert.equal(value,a+b);
 }
});
