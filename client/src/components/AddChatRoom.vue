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
                <p>{{ test }}</p>

                <div class="form-group">
                    <label for="type">Type</label>
                    <input
                    class="form-control"
                    id="type"
                    required
                    v-model="chatroom.type"
                    name="type"
                    />
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
    import Navbar from "../components/layouts/Navbar.vue";

    const chatroom = {
        id: null,
        name: '',
        type: ''
    };

    function saveChatRoom() {

        let data = {
            name: chatroom.name,
            type: chatroom.type
        }


        axios.post('http://localhost:8081/api/chatrooms', {
            name: data.name,
            type: data.type
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
</style>