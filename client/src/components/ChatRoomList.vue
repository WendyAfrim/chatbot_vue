<template>
    <Navbar />

    <div class="container">
      <h1>Tous les salons</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom du salon</th>
            <th scope="col">Capacité</th>
            <th scope="col">Actif</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chatroom in chatrooms">
            <th scope="row">{{ chatroom.id }}</th>
            <td>{{ chatroom.name }}</td>
            <td>{{ chatroom.capacity ?? 'Non défini' }}</td>
            <td>{{ chatroom.open ? 'Oui' : 'Non' }}</td>
            <td>
              <router-link :to="`/admin/chatrooms/${chatroom.id}`" class="btn btn-outline-info">Modifier</router-link>
              <button class="btn btn-outline-danger" @click="deleteChatroom(chatroom.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
  import axios from "axios";
  import Navbar from "../components/layouts/Navbar.vue";
  
 export default{
  data() {
    return {
      chatrooms: [],
    }
  },

  components: {
    Navbar
  },

  methods: {
      async getAllChatrooms() {
        try {
          const response = await axios.get('http://localhost:8081/api/chatrooms');
          this.chatrooms = response.data
        } catch(error) {
          console.log('Err' + error)
        }
      },

      async deleteChatroom(chatroomId) {
        try {
          const response = await axios.delete(`http://localhost:8081/api/chatrooms/${chatroomId}`);
          window.location.reload();
        } catch(error) {
          console.log('Err' + error)
        }
      }
  },

  created() {
    this.getAllChatrooms();
  }  

 }

</script>


<style>
.btn {
  margin-right: 1em;
}
</style>