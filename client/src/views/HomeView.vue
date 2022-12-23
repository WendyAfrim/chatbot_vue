<script setup>

    import axios from 'axios'


    function getCounselerAvailable() {
       axios.get('http://localhost:8081/api/users/online', {

       }).then(response => {
            let data = response.data;

            if(data.length >= 1) {
                redirectToChat()
            } else {
                document.querySelector('.js-chat-closed-display').classList.remove('hide');
                document.querySelector('.js-chatbot').classList.remove('hide');
            }
       })
    };

    function redirectToChat() {
        setTimeout(() => {
            window.location.replace("http://localhost:8000/chat");
        }, 1000)
    };
</script>

<script>
    import  { mapGetters } from 'vuex'
    export default {
        name: 'HomeView',
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>


<template>
    <main>
        <div class="wrapper">
            <div class="home-actions">
                <span @click="getCounselerAvailable()" class="btn btn-light btn-action js-chat-target-counseler">Je souhaite parler <br> à un conseiller de vente</span>
                <span class="btn-action">Je souhaite rejoindre un salon</span>
            </div>
            
            <div class="chatbot">
                <p class="hide js-chat-closed-display">Aucun de nos conseillers n'est disponible. Je vous invite à utiliser notre chatbot :)</p>
                <div class="js-chatbot hide">
                    <RouterLink :to="'/chatbot'">
                        <img src="https://img.freepik.com/vecteurs-premium/chat-logo-monogramme-tete-robot-modele-conception-logo-chatbot_72830-26.jpg" alt="Chatbot logo" class="chatbot-img">
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    main {
        min-height: 100vh;
        background-image: url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
        opacity: 0.8;
    }

    .home-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding-top: 20em;
    }

    .btn-action {
        text-align: center;
        text-transform: uppercase;
        background-color: white;
        padding: 2em;
        border-radius: 2em;
        letter-spacing: 0.15em;
        line-height: 1.5em;
        font-weight: 700;
        width: 20em;
        height: 8em;
        cursor: pointer;
    }

    .hide {
        display: none;
    }

    .chatbot {
        text-align: center;
        margin-top: 2em;
    }

    .chatbot p {
        color: white;
    }

    .chatbot-img {
        width: 4em;
        margin-top: 1em;
        border-radius: 1.5em;
    }
</style>