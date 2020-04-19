const moduloA = require('./moduloA')
const moduloB = require('./moduloB')

const ola = moduloA.ola;
const bem_vindo = moduloA.bemVindo;
const ate_logo = moduloA.ateLogo;

console.log(ola);
console.log(bem_vindo);
console.log(ate_logo);

const bom_dia = moduloB.bomDia;
const boa_noite = moduloB.boaNoite;

console.log(bom_dia);
console.log(boa_noite());
