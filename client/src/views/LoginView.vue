<script>
    import axios from 'axios'
    import { store } from '../store.js'

    export default {
        data() {
            return {
                store,
            }
        },
        methods: {
            login() {
                axios.post('http://localhost:8081/api/users/login', {
                    email: document.getElementById('user').value,
                    password: document.getElementById('password').value
                })
                .then(response => {
                    if (response.data.success) {
                        this.logged = true
                        console.log(response.data)
                    } else {
                        console.log(response.data)
                    }
                })
            }
        }
    }
</script>

<template>
    <main>
        <div class="container">
            <form>
                <div class="form-group">
                <label for="user">Identifiant</label>
                <input type="text" class="form-control" id="user" name="user">
                </div>
                <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password">
                </div>
                <a class="btn btn-primary" @click="login()">Enregistrer</a>
            </form>
        </div>

    </main>
</template>

<style></style>