<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Accueil</router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/admin/chatrooms" class="nav-link">Liste des salons</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/chatrooms/add" class="nav-link">Ajout de salons</router-link>
      </li>
    </div>
  </nav>
</template>
<script></script>
<style>
  .navbar {
    margin-bottom: 1em;
  }
</style>