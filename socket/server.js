import { Server } from "socket.io"

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

    socket.on("chat_message", (msg) => {
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