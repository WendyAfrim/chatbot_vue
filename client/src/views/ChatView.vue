<template>
    <div id="messages"></div>
    <form @submit.prevent="socketEmitMessage">
        <input @input="getUserName" type="text" id="username" placeholder="Entrez votre nom">
        <input @input="getMessageValue" type="text" id="message" placeholder="Entrez votre message">
        <button>Envoyer</button>
    </form>
</template>

<script setup>
    import io from 'socket.io-client';

    const socket = io("ws://localhost:3000");

    socket.on("connect", () => {
        console.log("Connected to the socket")
    })


    function socketEmitMessage(event) {

        let username = document.querySelector('#username').value;
        let message = document.querySelector('#message').value

        if(username && message) {
            socket.emit('chat_message', {name: username, message: message})
        }
    }

    function socketListenToServerResponse() {
        socket.on('chat_message', (msg) => {
            document.querySelector('#messages').innerHTML += `<p>${ msg.name }: ${msg.message}</p>`
        });
    }

    socketListenToServerResponse();

</script>

<style>
#messages {
        border: 0.1em solid black;
        height: 90vh;
    }

    #messages p {
        margin: 0;
        padding: 10px;
    }

    #messages :nth-child(odd) {
        background-color: #aaa;
    }

    form {
        display: flex;
    }

    #name {
        flex: 1;
        padding: 10px;
    }

    #message {
        flex: 5;
        padding: 10px;
    }

    button {
        flex: 1;
        padding: 10px;
        border: none;
        cursor: pointer;
        background-color: #eee;
    }
</style>
