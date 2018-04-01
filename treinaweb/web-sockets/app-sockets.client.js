let socket = io("http://localhost:3000");

socket.on('server_message', receiveMessage);

function sendMessage(){
    if(event.keyCode === 13 && !event.shiftKey ){
        var name = document.getElementById('name').value;
        var text = document.getElementById('message').value;

        document.getElementById('message').value = '';

        socket.emit('client_message', {name,text});
    }
}

function receiveMessage(data){
    var element = document.getElementById('messages');

    element.innerHTML +=`
        <div>
            <strong>${data.name} says: </strong>${data.text}  
        </div>
    `;
}