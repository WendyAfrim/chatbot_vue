<template>
    <div class="wrapper">
    <aside>
        <ul id="tabs">
            <li v-for="chatroom, index in chatrooms"  
                        :data-room="chatroom.name" 
                        @click="getRoomClicked"
                        :class="{ 'active': index === 0 }"
                        > 
                # {{ chatroom.name }}
            </li>
        </ul>
    </aside>

    <main>
        <div id="content">
            <div id="messages"></div>
            <div id="writing"></div>
        </div>

        <form @submit.prevent="socketEmitMessage">
            <input type="text" id="username" placeholder="Entrez votre nom">
            <input type="text" id="message" placeholder="Entrez votre message">
            <button>Envoyer</button>
        </form>
    </main>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import ChatRoomDataService from '../services/ChatRoomDataService';

    export default {
        data(){ 
            return {
                socket: io("ws://localhost:3000"),
                chatrooms: [],
            }
        }, 
        beforeMount() {
            this.socket.on("connect", () => {
                let input = document.querySelector('.active');
                
                if(input.dataset.room === 'Général') {
                    this.socket.emit('enter_room', 'Général')
                }
         
            });
        },
        
        methods: {
            socketEmitMessage(event) {

                let username = document.querySelector('#username').value;
                let message = document.querySelector('#message').value;
                let room = document.querySelector('#tabs li.active').dataset.room;
                let createdAt = new Date();

                console.log(room);

                if(username && message) {
                    this.socket.emit('chat_message', {
                        name: username, 
                        message: message,
                        chatroom: room,
                        date: createdAt
                    })
                }

            },

            async getAllChatrooms(){
                ChatRoomDataService.getAll().then((response) => {
                    this.chatrooms = response.data;
                }).catch(e => {
                    console.log(e);
                });
            },

            getRoomClicked(event){
                
                let roomInput = event.target;
                let roomName = event.target.dataset.room;

                if(!roomInput.classList.contains('active')) {
                    const activeElement = document.querySelector('#tabs li.active');
                    activeElement.classList.remove('active');

                    roomInput.classList.add('active');

                    document.querySelector('#messages').innerHTML = "";

                    this.socket.emit('leave_room', activeElement.dataset.room)
                    this.socket.emit('enter_room', roomName);
                }
            }, 

            socketListenToServerResponse() {
                this.socket.on('received_message', (msg) => {
                    this.publishMessages(msg);
                });
            },


            socketListenInitMessages() {
                this.socket.on('init_messages', (msg) => {
                    let data = msg.messages

                    if(data !== []) {
                        data.forEach(message => {
                            this.publishMessages(message);
                        })
                    }
                });
            },

            publishMessages(msg) {
                let created = new Date(msg.createdAt);
                let text = `<div style="margin-bottom: 3em;"><p">${ msg.name } <small> ${created.toLocaleDateString()}</small></p><p> ${msg.message}</p></div>`;
                document.querySelector('#messages').innerHTML += text
            },

        }, 

        created() {

            this.socketListenToServerResponse();
            this.socketListenInitMessages();
            this.getAllChatrooms();
        }
    }

</script>

<style scoped>

.wrapper {
    display: flex;
    flex-direction: row-reverse;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    background-color: #2F3136;
}

aside {
    flex: 1;
}

#tabs {
    list-style: none;
    margin: 0;
    padding: 0;
}

#tabs li {
    padding: 1em;

}

#tabs li:not(.active) {
    cursor: pointer;
}

main {
    flex: 4;
}


#content {
    position: relative;
    height: 90vh;
}

#writing {
    position: absolute;
    bottom: 0;
}

.active {
    background-color: #aaa;
}
#messages {
    border: 0.1em solid black;
    height: 100%;
    width: 75em;
}

 
.message {
    margin-top: 3em;
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
    background-color: rgb(126, 184, 127);
}
</style>
