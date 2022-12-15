<script setup>
    import VueSocketIO from 'vue-socket.io'
    import io from 'socket.io-client';

    const socket = io("ws://localhost:3000");

    socket.on("connect", () => {
        console.log("Connected to the socket")
    })

    //  on ouvre une connexion socket
    window.onload = () => {
        document.querySelector("form").addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e)

            const name = document.querySelector('#name');
            const message = document.querySelector('#message');

            socket.emit('chat_message', {name: name.value, message: message.value})
            document.querySelector('#message').value = '';

        }) 

        socket.on('chat_message', (msg) => {
            document.querySelector('#messages').innerHTML += `<p>${ msg.name }: ${msg.message}</p>`
        });

    }
</script>

<template>
    <div id="messages"></div>
    <form>
        <input type="text" id="name" placeholder="Entrez votre nom">
        <input type="text" id="message" placeholder="Entrez votre message">
        <button>Envoyer</button>
    </form>
</template>

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
