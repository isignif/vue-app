<template>
  <div class="navbar navbar-expand-md navbar-light bg-light header">
    <div class="container">
      <router-link to="/">
        <img src="./../assets/logo.svg" alt="" height="38" width="130" />
      </router-link>
      <button aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-target="#navbarCollapse" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse justify-content-between" id="navbarCollapse">
        <!--/ ITEMS LEFT ALIGNED -->
        <ul class="navbar-nav mr-auto">
          <!-- <% if current_user %> -->
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/acts" class="nav-link">Mes actes</router-link>
          </li>
          <li class="nav-item"><a href="/messages/" class="nav-link">Mes messages</a></li>
          <!-- <% end %> -->
        </ul>
        <!--/ ITEMS RIGHT ALIGNED -->
        <ul class="navbar-nav">
          <!-- <% if current_user %> -->

          <!-- <% else %> -->
          <li class="nav-item"><a href="/signup" class="nav-link">Se connecter</a></li>
          <li class="nav-item"><a href="/signin" class="nav-link">S'inscrire</a></li>
          <li class="nav-item"><a href="/acts/new" class="nav-link">Déposer un acte</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {}
}
</script>
