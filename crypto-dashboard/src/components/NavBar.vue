<template>
    <v-app>
        <v-card dark flat tile>
            <v-toolbar dense @click.stop="mini = !mini">
                <v-app-bar-nav-icon color="yellow"></v-app-bar-nav-icon>

                <v-toolbar-title>Crypto Dashboard</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon color="yellow">mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon color="yellow">mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon color="yellow">mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>
        <v-sheet color="grey" class="overflow-hidden">
            <v-container class="fill-height pa-10">
                <v-row align="center" justify="center">
                    <!-- <v-btn color="pink" dark @click.stop="mini = !mini">
                        Toggle
                    </v-btn>
                    <br>
                    <h1>Home</h1> -->
                    <router-view></router-view>

                </v-row>
            </v-container>

            <v-navigation-drawer dark v-model="mini" absolute temporary>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://avatars.githubusercontent.com/u/88609394?v=4"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Saeed Zahedi</v-list-item-title>
                    </v-list-item-content>
                    <v-btn icon @click.stop="mini = !mini">
                        <v-icon color="yellow">mdi-chevron-left</v-icon>
                    </v-btn>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
                        <v-list-item-icon>
                            <v-icon color="yellow">{{ item.icon }}</v-icon>
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
    name: 'NavBar',
    data() {
        return {
            drawer: true,
            items: [
                { title: 'Home', icon: 'mdi-home-roof', to: '/' },
                { title: 'Coins', icon: 'mdi-currency-btc', to: '/coins' },
                { title: 'Search', icon: 'mdi-magnify', to: '/search' },
            ],
            mini: false,
        }
    },
}

</script>