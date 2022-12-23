<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<script>
    import  { mapGetters } from 'vuex'
    export default {
        name: 'App',
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<template>
    <div v-if="user.id != -1">
        <a href="#" @click="logout">logout</a>
    </div>
    <div v-else >
        <RouterLink to="/login">login</RouterLink>
    </div>
    <RouterView />
</template>