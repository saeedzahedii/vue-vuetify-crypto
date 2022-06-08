<template>
    <v-card dark class="pa-5" elevation="4" shaped>
        <v-tabs left v-model="tabs">
            <v-tab>
                <v-icon>mdi-currency-btc</v-icon> Coins
            </v-tab>
            <v-tab>
                <v-icon>mdi-star-check</v-icon> Faved Coins
            </v-tab>
        </v-tabs>

        <v-tabs-items dark v-model="tabs">
            <v-tab-item>
                <v-card>
                    <table class="mt-5" style="width: 100%">
                        <thead>
                            <tr class="thead">
                                <th>#</th>
                                <th>Rank</th>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>24h Volume</th>
                                <th>Sparkline</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="coin in displayCoinList" :key="coin.id" class="tbody">
                                <td><img :src="coin.iconUrl" alt="" /></td>
                                <td>{{ coin.rank }}</td>
                                <td>{{ coin.symbol }}</td>
                                <td>
                                    <router-link :to="{ name: 'coindetail', params: { uuid: coin.uuid } }">{{ coin.name
                                    }}
                                    </router-link>
                                </td>
                                <td>{{ coin.price }}</td>
                                <td>{{ coin.change }}</td>
                                <td>{{ coin.hVolume }}</td>
                                <td>
                                    <v-sparkline :value="coin.chart" color="yellow">
                                    </v-sparkline>
                                </td>
                                <td>
                                    <v-btn color="yellow" light elevation="3" fab>
                                        <v-icon>mdi-star-outline</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center mt-5">
                        <v-btn outlined class="mr-1" color="yellow" :disabled="page == 1 ? true : false"
                            @click="getCoinsList('prev')">
                            <v-icon>mdi-arrow-left-thin</v-icon> prev
                        </v-btn>
                        <v-btn outlined class="ml-1" color="yellow" :disabled="page == 10 ? true : false"
                            @click="getCoinsList('next')"> next <v-icon>mdi-arrow-right-thin</v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card>
                    <h2>Faved Coins</h2>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>

</template >
        
            <script>
import axios from 'axios'
export default {
    name: 'CoinsComponent',
    data() {
        return {
            tabs: null,
            coinsList: [],
            displayCoinList: [],
            page: 1,
            limit: 40,
            offset: 0
        }
    },
    mounted() {
        axios({
            method: "get", baseURL: `https://api.coinranking.com/v2/coins?limit=${this.limit}&offset=${this.offset}`,
            headers: { "x-access-token": `token ${this.$access_token}`, },
        }).then((resultat) => {
            this.coinsList = resultat.data.data.coins;
            this.displayCoinList = resultat.data.data.coins;
            this.generateList(this.displayCoinList);

        })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        getCoinsList(btn) {
            if (btn == 'next') {
                this.offset = this.offset + this.limit;
                this.page++;
                console.log(this.page);
            } else if (btn == 'prev') {
                this.offset = this.offset - this.limit;
                this.page--;
                console.log(this.page);
            }
            axios({
                method: "get",
                baseURL: `https://api.coinranking.com/v2/coins?limit=${this.limit}&offset=${this.offset}`,
                headers: {
                    "x-access-token": `token ${this.$access_token}`,
                },
            })
                .then((resultat) => {
                    this.coinsList = resultat.data.data.coins;
                    this.displayCoinList = resultat.data.data.coins;
                    this.generateList(this.displayCoinList);

                })
                .catch((error) => {
                    console.log(error);
                });
        },
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
            console.log(coins)
            // console.log(coins);
        },
    }
}
</script>

                            <style scoped>
th,
td {
    padding: 10px;
    text-align: center;
}

tr.thead {
    background: #ffe600;
    color: #000;
}

tr.tbody td img {
    width: 60px;
    height: 60px;
    margin: 0px !important;
    background: white;
    border-radius: 100px;
}
tr.tbody:hover {
    background: #ffffff20;
}
</style>
