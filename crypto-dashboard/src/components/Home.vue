<template>
    <v-app>
        <h1>Top 6 Coins</h1>
        <v-card color="#d1d1d1" flat class="topcoins">
            <v-card class="ma-2" v-for="coin in displayCoinList" :key="coin.id" dark>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                            <v-chip color="yellow" label outlined>{{ coin.symbol }}</v-chip>
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                            {{ coin.name }}
                        </v-list-item-title>
                        <p>{{ coin.price }} $</p>
                        <p class="font-weight-black">
                            <v-chip :color="coin.change > 0 ? 'green' : 'red'" label outlined>{{
                                    coin.change
                            }} %</v-chip>
                        </p>
                    </v-list-item-content>

                    <v-list-item-avatar size="80" color="white">
                        <img :src="coin.iconUrl">
                    </v-list-item-avatar>
                </v-list-item>
                <div class="coinchart">
                    <v-sparkline :value="coin.chart" color="#ffe000">
                    </v-sparkline>
                </div>

                <v-card-actions>
                    <v-btn color="yellow" outlined>
                        <router-link :to="{ name: 'coindetail', params: { uuid: coin.uuid } }">See Coin
                        </router-link>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

        <v-divider class="my-3"></v-divider>

        <h1>Top 3 Best Coins</h1>
        <v-card color="#d1d1d1" flat class="topcoins">
            <v-card class="ma-2" v-for="bestcoin in bestCoins" :key="bestcoin.id" dark>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                            <v-chip color="yellow" label outlined>{{ bestcoin.symbol }}</v-chip>
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                            {{ bestcoin.name }}
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar size="80" color="white">
                        <img :src="bestcoin.iconUrl">
                    </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn color="primary" outlined>
                        <router-link :to="{ name: 'coindetail', params: { uuid: bestcoin.uuid } }">See Coin
                        </router-link>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

        <v-divider class="my-3"></v-divider>

        <h1>Top 3 New Coins</h1>
        <v-card color="#d1d1d1" flat class="topcoins">
            <v-card class="ma-2" v-for="newcoin in newestCoins" :key="newcoin.id" dark>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                            <v-chip color="yellow" label outlined>{{ newcoin.symbol }}</v-chip>
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                            {{ newcoin.name }}
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar size="80" color="white">
                        <img :src="newcoin.iconUrl">
                    </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn color="primary" outlined>
                        <router-link :to="{ name: 'coindetail', params: { uuid: newcoin.uuid } }">See Coin
                        </router-link>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeComponent',
    data() {
        return {
            displayCoinList: [],
            bestCoins: [],
            newestCoins: [],
            coinlimit: 6,
            exchangelimit: 3,
            offset: 0,
            btcDominance: 0,
            total24hVolume: 0,
            totalCoins: 0,
            totalExchanges: 0,
            totalMarketCap: 0,
            totalMarkets: 0
        }
    },

    mounted() {
        axios({
            method: "get", baseURL: `https://api.coinranking.com/v2/coins?limit=${this.coinlimit}&offset=${this.offset}`,
            headers: { "x-access-token": `token ${this.$access_token}`, },
        }).then((resultat) => {
            this.coinsList = resultat.data.data.coins;
            this.displayCoinList = resultat.data.data.coins;
            this.generateList(this.displayCoinList);

        })
            .catch((error) => {
                console.log(error);
            });
        axios({
            method: "get", baseURL: `https://api.coinranking.com/v2/stats`,
            headers: { "x-access-token": `token ${this.$access_token}`, },
        }).then((res) => {
            this.bestCoins = res.data.data.bestCoins;
            this.newestCoins = res.data.data.newestCoins;
            this.btcDominance = res.data.data.btcDominance;
            this.total24hVolume = res.data.data.total24hVolume;
            this.totalCoins = res.data.data.totalCoins;
            this.totalExchanges = res.data.data.totalExchanges;
            this.totalMarketCap = res.data.data.totalMarketCap;
            this.totalMarkets = res.data.data.totalMarket;
        })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        generateList(coins) {
            let i = 0;
            coins.forEach((object) => {
                // delete object['iconUrl'];
                object["hVolume"] = object["24hVolume"];
                object["id"] = i;
                object["chart"] = object["sparkline"].map(data => {
                    return Number(data);
                })
                i++;
            });
            // console.log(coins);
        },
    }
}

</script>
<style scoped>
.topcoins {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
    gap: 0px;
}

.coinchart {
    background: #ffffff2e;
    padding: 15px;
}

@media  (max-width:900px) {
    .topcoins {
        grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    }
}
@media  (max-width:500px) {
    .topcoins {
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
}
</style>