<template>
<v-navigation-drawer app>
  <v-toolbar flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          iSignif
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>

  <!-- <v-divider></v-divider> -->

  <v-list class="pt-0">
    <v-list-tile v-for="item in items" :key="item.title" :to=" item.link">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      items: [{
          title: 'Dashboard',
          icon: 'dashboard',
          link: '/dashboard',
        },
        {
          title: 'Mes actes',
          icon: 'assignment',
          link: '/acts',
        },
        {
          title: 'Messages',
          icon: 'all_inbox',
          link: '/messages',
        },
        {
          title: 'Mon compte',
          icon: 'face',
          link: '/',
        },
        {
          title: 'Aide',
          icon: 'help',
          link: '/help',
        },
      ],
      right: null
    }
  }
}
</script>
