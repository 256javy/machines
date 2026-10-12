export const stages = ['Preparado', 'Buscar', 'Decodificar', 'Ejecutar', 'Guardar'];
export function state(step) {
  if (!Number.isInteger(step) || step < 0 || step > 4) throw new RangeError('Paso fuera de rango');
  return {step, stage: stages[step], a: 3, b: 2, result: step >= 3 ? 5 : null, register: step >= 4 ? 5 : 3};
}
export function addBits(a,b) {
  let carry=0;
  return Array.from({length:4},(_,i)=>{
    const x=(a>>i)&1,y=(b>>i)&1,incoming=carry;
    const sum=x^y^carry; carry=(x&y)|(carry&(x^y));
    return {x,y,incoming,sum,carry};
  });
}
