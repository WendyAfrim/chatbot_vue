import { Server } from "socket.io"
import axios from 'axios'

// On instancie socket.io 
const io = new Server(3000, {
    cors: {
        origin: "http://localhost:8000",
    }
});

// On écoute l'évenement "connection" de socket.io
io.on('connection', (socket) => {
    console.log('Une connexion est active')

    // On ecoute les deconnexions
    socket.on('disconnect', () => {
        console.log('Deconnexion');
    })

    socket.on('enter_room', (room) => {
        socket.join(room);

        axios.get('http://localhost:8081/api/chats/room/' + room, {
            room: room
        }).then((list) => {
            console.log(list);
            if(list.data) {
                socket.emit('init_messages', {messages: list.data})
            } 
            console.log(list);
        }).catch(e => {
            console.log(e);
            socket.emit('init_messages', {messages: {}})
        }) 
    });

    socket.on('leave_room', (room) => {
        socket.leave(room);
    });

    socket.on("chat_message", (msg) => {

        axios.post('http://localhost:8081/api/chats/', {
            name: msg.name,
            message: msg.message,
            chatroom: msg.chatroom,
            createdAt: msg.date
        }).then((response) => {
            io.in(msg.chatroom).emit('received_message', msg);
        }).catch(e => {
            console.log(e);
        });

       io.emit('chat_message', msg);
    })

    socket.on("chatbot_welcome", (msg) => {
        io.emit('chatbot_welcome', msg);
     });

    socket.on("chatbot_user_request", (msg) => {
       io.emit('chatbot_user_request', msg);
    })

    socket.on("chatbot_response", (msg) => {
        io.emit('chatbot_response', msg);
     })

});