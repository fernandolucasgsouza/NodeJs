
var EventEmmiter = require('events');

var emitter = new EventEmmiter();
emitter.on('meu_evento', (number)=>{
    console.log('Meu evento',number)
});
emitter.emit('meu_evento', 123);



class Cao extends EventEmmiter{
    latir(){
        console.log('Au au!')
    }
}

var Rex = new Cao();
Rex.on('pessoa_no_portao', Rex.latir);
Rex.emit('pessoa_no_portao')