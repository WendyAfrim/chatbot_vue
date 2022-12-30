<template>
    <div class="container">
      <h1>Tous les salons</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom du salon</th>
            <th scope="col">Capacité</th>
            <th scope="col">Nombre de participants</th>
            <th scope="col">Etat</th>
            <th scope="col">Actif</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chatroom in chatrooms">
            <th scope="row">{{ chatroom.id }}</th>
            <td>{{ chatroom.name }}</td>
            <td>{{ chatroom.capacity ?? 'Non défini' }}</td>
            <td>{{ chatroom.numberOfguests ?? 'Non défini' }}</td>
            <td>{{ chatroom.state ?? 'Non défini' }}</td>
            <td>{{ chatroom.open ? 'Oui' : 'Non' }}</td>
            <td>
              <button class="btn btn-outline-info" @click="deleteChatroom(chatroom.id)">Rejoindre</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<script>

    import ChatRoomDataService from "../../services/ChatRoomDataService";

    export default{
        data(){
            return {
                chatrooms: []
            }
        },
        
        methods:{
            getAllChatrooms() {
                ChatRoomDataService.getAll()
                .then((response) => {
                    this.chatrooms = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },

        created() {
            this.getAllChatrooms();
        }
    }
</script>
<style></style>