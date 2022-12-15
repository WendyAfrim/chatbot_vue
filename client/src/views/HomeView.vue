<script setup>
    function redirectToChat() {
        setTimeout(() => {
            window.location.replace("http://localhost:8000/chat");
        }, 1000)
    };

    function displayMessageChatIsClosed() {
        document.querySelector('.js-chat-closed-display').classList.remove('hide');
    };

    function chatIsOpen() {
        const d = new Date();
        let hour = d.getHours();

        if(hour >= 9 && hour < 15) {
            return true;
        }

        return false;
    };

    function getCounselerAvailable() {
        let chatOpen = chatIsOpen();

        if(chatOpen) {
            redirectToChat();
        } else {
            displayMessageChatIsClosed();
        }
    }



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