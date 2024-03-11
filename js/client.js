// console.log('bravo');
const socket = io('http://localhost:8000');
// console.log('alpha');


const form = document.querySelector('#input-container');
const inputField = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-button');
const messageContainer = document.querySelector('#message-container');
const audio = new Audio('./../notification.mp3');




const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if (position == 'left') {
        console.log('sound is playing');
        audio.play();
    }
};


inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = inputField.value;
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        inputField.value = '';
    }
});
sendButton.addEventListener('click', (e) => {
        const message = inputField.value;
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        inputField.value = '';
});



const name = prompt("Enter your NAME to join the server");
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});