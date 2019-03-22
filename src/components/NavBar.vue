<template>
<v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless>
  <v-toolbar flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          iSignif
        </v-list-tile-title>
        <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
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
      drawer: true,
      mini: true,
      right: null,
      items: [{
          title: 'Dashboard',
          icon: 'dashboard',
          link: '/dashboard',
        },
        {
          title: 'Mes demandes',
          icon: 'assignment',
          link: '/acts',
        },
        {
          title: 'Mes actes',
          icon: 'assignment_return',
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
    }
  }
}
</script>
