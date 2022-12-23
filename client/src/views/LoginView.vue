<script>
    import  { mapGetters } from 'vuex'
    export default {
        name: 'LoginView',
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            login() {
                const email = document.getElementById('user').value
                const password = document.getElementById('password').value
                this.$store.dispatch('login', { email:email, password:password}).then(() => {
                    console.log(this.user.id)
                })
            }
        }
    }
</script>

<template>
    <main>
        <div class="container">
            <form class="login-actions" @submit.prevent="login">
                <div class="form-group">
                <label for="user">Identifiant</label>
                <input type="text" class="form-control" id="user" name="user">
                </div>
                <div class="form-group mt-1">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password">
                </div>
                <button class="btn btn-primary btn-connect mt-3">Se connecter</button>
            </form>
        </div>

    </main>
</template>

<style scoped>
    main {
        min-height: 100vh;
        background-image: url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
        opacity: 0.8;
    }

    .login-actions {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding-top: 20em;
    }

    .btn-connect {
        text-align: center;
        padding-left: 40px;
        padding-right: 40px;
    }

</style>