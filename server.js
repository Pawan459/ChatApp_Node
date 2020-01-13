const io = require('socket.io')(3000)

const users = {}


io.on('connection', socket =>{
    socket.on('new-user', name => {
        console.log(`${name} connected to server`)
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
        
    })
    socket.on('Typing', ()=>{
        socket.broadcast.emit('isTyping', users[socket.id])
    })
    socket.on('clearDivision',()=>{
        socket.broadcast.emit('clearTyping');
    })
})