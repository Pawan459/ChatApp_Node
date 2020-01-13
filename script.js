const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const isTyping = document.getElementById('typing')

const name = prompt('What is your name? ')
appendMessage('You Joined')

socket.emit('new-user', name)

socket.on('chat-message', data=>{
    appendMessage(`${data.name} : ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} left`)
})

socket.on('isTyping', name=>{
    isTyping.innerText = name+' is typing'
})

socket.on('clearTyping',()=>{
    clearDiv(isTyping)
})

messageInput.addEventListener('input', e=>{
    const message = messageInput.value
    if(message == null || message.length == 0)
        socket.emit('clearDivision')
    else
        socket.emit('Typing')
})

messageForm.addEventListener('submit', e=> {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You : ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
    socket.emit('clearDivision')
})


function clearDiv(isTyping){
    isTyping.innerText = ''
}

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}


