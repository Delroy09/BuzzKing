const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const participants = new Map();

io.on('connection', (socket) => {
    socket.on('register', (name) => {
        participants.set(socket.id, name);
    });

    socket.on('buzzer', (answer) => {
        const name = participants.get(socket.id);
        const timestamp = Date.now();
        io.emit('buzzer-press', {
            name,
            answer,
            timestamp
        });
    });

    socket.on('disconnect', () => {
        participants.delete(socket.id);
    });
});

http.listen(3000, () => {
    console.log('Server running on port 3000');
});