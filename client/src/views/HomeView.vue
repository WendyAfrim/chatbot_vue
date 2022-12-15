<script setup>
    import { store } from '../store.js';
    import axios from 'axios'


    function getCounselerAvailable() {
       axios.get('http://localhost:8081/api/users/online', {

       }).then(response => {
            let data = response.data;

            if(data.length >= 1) {
                redirectToChat()
            } else {
                document.querySelector('.js-chat-closed-display').classList.remove('hide');
            }
       })
    };

    function redirectToChat() {
        setTimeout(() => {
            window.location.replace("http://localhost:8000/chat");
        }, 1000)
    };
</script>

<template>
    <main>
        <div class="wrapper">
            <button @click="getCounselerAvailable()" class="btn btn-light js-chat-target-counseler">Je souhaite parler à un conseiller de vente</button>
            <p class="hide js-chat-closed-display">Notre chat est malheureusement fermé. <br> Nos horaires d'ouvertures sont de 9h à 18h ! Nos conseillers seront ravis de répondre à vos questions dès l'ouverture. :)</p>
        </div>
    </main>
</template>

<style src="../assets/home.css"></style>