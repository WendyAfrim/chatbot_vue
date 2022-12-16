<script setup>

import io from 'socket.io-client';
import chatbot from '../assets/bot.js'


    let self = {};
    const socket = io("ws://localhost:3000");

    self.init = () => {
        self.connectToSocket();
        self.welcomeClient();
    }

    self.connectToSocket = () => {

        socket.on("connect", () => {
            console.log("Connected to the socket")
        })
    }

    self.welcomeClient = () => {
        socket.emit('chatbot_welcome', "Bonjour, je suis un chatbot, que puis-je faire pour vous ?");

        socket.on("chatbot_welcome", (msg) => {
            self.displayMessageInTheDom('Chatbot', msg);
        })   
    }

    self.sendUserRequestToSocket = () => {

        let message = document.querySelector('#message').value;

        socket.emit('chatbot_user_request', {name: "You", message: message})
        document.querySelector('#message').value = '';

    }

    socket.on('chatbot_user_request', (msg) => {

        self.displayMessageInTheDom(`${ msg.name }`, `${msg.message}`);
        let response = chatbot().getAutomaticResponse(msg.message);

        socket.emit('chatbot_response', response);

    });

    socket.on('chatbot_response', (msg) => {
        self.displayMessageInTheDom('Chatbot', msg);
    });

    self.displayMessageInTheDom = (persona, msg) => {
        
        if('Chatbot' === persona) {
            setTimeout(() => {
                document.querySelector('#messages-bot').innerHTML += `<p> ${ persona } : ${ msg }</p>`
            }, 2000)
        } else {
            document.querySelector('#messages-bot').innerHTML += `<p> ${ persona } : ${ msg }</p>`
        }

    }

    self.init();
</script>

<template>
  <div id="messages-bot"></div>
    <form @submit.prevent="self.sendUserRequestToSocket">
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
