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
        console.log(socket.rooms);
    });

    socket.on('leave_room', (room) => {
        socket.leave(room);
    });

    socket.on("chat_message", (msg) => {

        // const message = ChatDataService.create({
        //     name: msg.name,
        //     message: msg.message,
        //     chatroom: msg.room,
        //     createdAt: msg.date
        // }).then(() => {
        //     io.in(msg.room).emit('received_message', msg);
        // }).catch(e => {
        //     console.log(e);
        // });

        axios.post('http://localhost:8081/api/chats', {
            name: msg.name,
            message: msg.message,
            chatroom: msg.room,
            createdAt: msg.date
        }).then(() => {
            io.in(msg.room).emit('received_message', msg);
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