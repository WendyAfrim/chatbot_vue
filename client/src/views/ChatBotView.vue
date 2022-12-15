<script setup>
    import VueSocketIO from 'vue-socket.io'
    import io from 'socket.io-client';
    import chatbot from '../assets/bot.js'

    const socket = io("ws://localhost:3000");

    socket.on("connect", () => {
        console.log("Connected to the socket")
    })

    socket.emit('chatbot_response', "Bonjour, je suis un chatbot, que puis-je faire pour vous ?");

    //  on ouvre une connexion socket
    window.onload = () => {

        socket.on("chatbot_response", (msg) => {
            document.querySelector('#messages-bot').innerHTML += `<p> Chatbot : ${ msg }</p>`
        })   

        document.querySelector("form").addEventListener('submit', (e) => {
            e.preventDefault();        

            const message = document.querySelector('#message');

            socket.emit('chatbot_request', {name: "You", message: message.value})
            document.querySelector('#message').value = '';

        }) 

        socket.on('chatbot_request', (msg) => {

            document.querySelector('#messages-bot').innerHTML += `<p>${ msg.name }: ${msg.message}</p>`
            let response = chatbot().init(msg.message);

            socket.emit('chatbot_response', response);
        });

    }
</script>

<template>
  <div id="messages-bot"></div>
    <form>
        <input type="text" id="message" placeholder="Entrez votre message">
        <button>Envoyer</button>
    </form>
</template>

<style>
 #messages-bot {
            border: 0.1em solid black;
            height: 90vh;
        }

        #messages-bot p {
            margin: 0;
            padding: 10px;
        }

        #messages-bot :nth-child(odd) {
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
