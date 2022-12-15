import { Server } from "vue-socket.io"

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
        //  On relaie le message vers tous les utilisateurs connectés
       io.emit('chat_message', msg);
    })

    socket.on("chatbot_request", (msg) => {
        //  On relaie le message vers tous les utilisateurs connectés
       io.emit('chatbot_request', msg);
    })

    socket.on("chatbot_response", (msg) => {
        //  On relaie le message vers tous les utilisateurs connectés
       io.emit('chatbot_response', msg);
    });
});