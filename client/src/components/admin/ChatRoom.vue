<template>
    <Navbar />
    <div class="container">
        <h1>Formulaire  Modification d'un salon</h1>
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

                    <input type="checkbox" id="open" name="open" checked :value="chatroom.open">
                    <label for="open">Ouvert</label>

                </div>

                <button @click="updateChatroom" class="btn btn-outline-info">Enregistrer</button>
            </div>

            <div v-else>
                <h4>You submitted successfully!</h4>
                <button class="btn btn-outline-info" @click="newTutorial">Add</button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import Navbar from "../../components/layouts/Navbar.vue";

    export default {
        data(){
            return {
                chatroomId : '',
                chatroom : {}
            }
        }, 
        components: {
            Navbar
        },
        mounted() {
            this.chatroomId = this.$route.params.id
        }, 
        methods: {
            async getChatRoom() {
                try {
                    const response = await axios.get(`http://localhost:8081/api/chatrooms/${this.$route.params.id}`)
                    this.chatroom = response.data
                } catch(error) {
                    console.log('Err' + error)
                }       
            },

            async updateChatroom() {
                try {
                    const response = await axios.put(`http://localhost:8081/api/chatrooms/${this.$route.params.id}`, {
                        name : this.chatroom.name,
                        capacity : this.chatroom.capacity
                    })
                    this.$router.push('/admin/chatrooms');
                } catch(error) {
                    console.log('Err' + error)
                }  
            }
        },
        created() {
            this.getChatRoom();
        }  
    }
</script>
<style></style>