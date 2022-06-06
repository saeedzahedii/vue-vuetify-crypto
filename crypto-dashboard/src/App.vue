<template>
  <v-app>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense @click.stop="mini = !mini">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Crypto Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-sheet class="overflow-hidden">
      <v-container class="fill-height pt-10">
        <v-row align="center" justify="center">
          <!-- <v-btn color="pink" dark @click.stop="mini = !mini">
                        Toggle
                    </v-btn>
                    <br>
                    <h1>Home</h1> -->
          <router-view></router-view>

        </v-row>
      </v-container>

      <v-navigation-drawer v-model="mini" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-roof', to:'/' },
        { title: 'Coins', icon: 'mdi-currency-btc',to:'/coins' },
        { title: 'Search', icon: 'mdi-magnify',to:'/search' },
      ],
      mini: false,
    }
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Questrial");

* {
  font-family: "Questrial";
}

body,
html {
  margin: 0px;
  padding: 0px;
}
</style>
