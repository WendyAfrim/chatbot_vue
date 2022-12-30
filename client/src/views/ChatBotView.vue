<script setup>

import io from 'socket.io-client';
import chatbot from '../assets/bot.js'
import axios from 'axios'

    const bot = chatbot();

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
        if (document.querySelector('#messages-bot')) {
            document.querySelector('#messages-bot').innerHTML = "";
        } 

        console.log("Welcome client");

        socket.emit('chatbot_welcome', bot.firstResponse());
        
        socket.on("chatbot_welcome", (msg) => {
            self.displayMessageInTheDom('Chatbot', msg);
        });
    }

    self.sendUserRequestToSocket = () => {

        let message = document.querySelector('#message').value;

        socket.emit('chatbot_user_request', {name: "You", message: message})
        document.querySelector('#message').value = '';

    }

    socket.on('chatbot_user_request', (msg) => {

        self.displayMessageInTheDom(`${ msg.name }`, `${msg.message}`);
        let response = bot.getAutomaticResponse(msg.message);

        socket.emit('chatbot_response', response);

    });

    socket.on('chatbot_response', (msg) => {
        self.displayMessageInTheDom('Chatbot', msg);
    });
    
    self.getAppointments = (data) => {
        
        if (data === undefined) {
            data = {};
        }
        
        console.log(data);
        
        axios.post('http://localhost:8081/api/appointment', data).then((res) => {
            console.log(res.data);
            if (res.data.length > 0) {
                document.querySelector('#'+bot.getAppointmentValidId()).disabled = true;
                document.querySelector('#'+bot.getAppointmentMessageId()).innerHTML = "Il n'y a plus de rendez-vous disponible à cette date et à cette heure";
                document.querySelector('#'+bot.getAppointmentMessageId()).style.display = "";
            } else {
                document.querySelector('#'+bot.getAppointmentValidId()).disabled = false;
                document.querySelector('#'+bot.getAppointmentMessageId()).innerHTML = "";
                document.querySelector('#'+bot.getAppointmentMessageId()).style.display = "none";
            }
            return res.data;
        }).catch((err) => {
            console.log(err);
            return {error: err}
        })
    }

    self.displayMessageInTheDom = (persona, msg) => {
        if('Chatbot' === persona) {
            setTimeout(() => {
                document.querySelector('#messages-bot').innerHTML += `<p> ${ persona } : ${ msg }</p>`
                
                if (bot.getStateIntent() == "Stop") {
                    setTimeout(() => {
                        self.welcomeClient();
                    }, 1000)
                }

                if (bot.getAppointmentDateId() !== "" && bot.getAppointmentTimeId() !== "") {
                    
                    document.querySelector('#'+bot.getAppointmentDateId()).addEventListener('change', (e) => {
                        let date = e.target.value;
                        let time = document.querySelector('#'+bot.getAppointmentTimeId()).value;

                        if (time != "") {
                            self.getAppointments({date: date, time: time});
                        }
                    })
                    
                    document.querySelector('#'+bot.getAppointmentTimeId()).addEventListener('change', (e) => {
                        let time = e.target.value;
                        let date = document.querySelector('#'+bot.getAppointmentDateId()).value;
                        
                        if (date != "") {
                            self.getAppointments({date: date, time: time});
                        }
                    })

                    document.querySelector('#'+bot.getAppointmentValidId()).addEventListener('click', (e) => {
                        e.preventDefault();
                        let date = document.querySelector('#'+bot.getAppointmentDateId()).value;
                        let time = document.querySelector('#'+bot.getAppointmentTimeId()).value;

                        axios.post("http://localhost:8081/api/appointment/create", {date: date, time: time, type: bot.getStateIntent()}).then((res) => {
                            console.log(res.data);
                            document.querySelector('#'+bot.getAppointmentMessageId()).innerHTML = "Votre rendez-vous a bien été pris";
                        }).catch((err) => {
                            console.log(err);
                            document.querySelector('#'+bot.getAppointmentMessageId()).innerHTML = "Une erreur est survenue lors de la prise de rendez-vous";                            
                        }).finally(() => {
                            self.welcomeClient();
                        })
                        console.log(date);
                    })

                    if (document.querySelector('#'+bot.getAppointmentDateId()).value !== "" && document.querySelector('#'+bot.getAppointmentTimeId().value == "").value !== null) {
                        document.querySelector('#'+bot.getAppointmentValidId()).disabled = false;                    
                    } else {
                        document.querySelector('#'+bot.getAppointmentValidId()).disabled = true;
                    }
                }

            }, 500)
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
