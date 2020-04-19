const contadorA = require('./instanciaUnica')
const contadorB = require('./instanciaUnica')

const contadorC = require('./instanciaNova')()
const contadorD = require('./instanciaNova')()

//cache
 contadorA.inc()
 contadorA.inc()

 //factor
 contadorC.inc()
 contadorC.inc()

console.log(`A: ${contadorA.value}, `, `B: ${contadorB.value}`);
console.log(`C: ${contadorC.value}, `, `D: ${contadorD.value}`);
