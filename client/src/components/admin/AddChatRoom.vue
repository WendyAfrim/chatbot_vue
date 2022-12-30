<template>
    <Navbar />
    <div class="container">
        <h1>Formulaire  Ajout d'un salon</h1>
        <div class="submit-form">
            <div v-if="!submitted">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                    type="text"
                    class="form-control"
                    id="name"
                    required
                    v-model="chatroom.name"
                    name="name"
                    />
                </div>

                <div class="form-group">
                    <label for="capacity">Capacité</label>
                    <input 
                    type="number"
                    class="form-control"
                    id="capacity"
                    required
                    v-model="chatroom.capacity"
                    name="capacity"
                    />
                </div>

                <div class="form-group">

                    <input type="checkbox" id="open" name="open" checked v-model="chatroom.open">
                    <label for="open">Ouvert</label>

                </div>

                <button @click="saveChatRoom" class="btn btn-outline-info">Ajouter</button>
            </div>

            <div v-else>
                <h4>You submitted successfully!</h4>
                <button class="btn btn-outline-info" @click="newTutorial">Add</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import Navbar from "../../components/layouts/Navbar.vue";

    const chatroom = {
        id: null,
        capacity: 0,
        open: true
    };

    function saveChatRoom() {

        let data = {
            name: chatroom.name,
            capacity: chatroom.capacity,
            open: chatroom.open
        }


        axios.post('http://localhost:8081/api/chatrooms', {
            name: data.name,
            capacity: data.capacity,
            open: data.open
        })
        .then((response) => {
            if (response.data.success) {
                console.log(response.data)
            } else {
                console.log(response.data)
            }
        })
        .catch((error)=> {
            console.log('Err: ' + error)
        })
    }

</script>
<style scoped>
    .btn {
        margin-top: 1em;
    }

    input {
        margin-top: 1em;
    }
</style>