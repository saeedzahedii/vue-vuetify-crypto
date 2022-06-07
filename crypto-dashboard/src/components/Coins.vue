<template>
    <v-card class="pa-5" elevation="4" shaped>
        <v-tabs left v-model="tabs">
            <v-tab>
                <v-icon>mdi-currency-btc</v-icon> Coins
            </v-tab>
            <v-tab>
                <v-icon>mdi-star-check</v-icon> Faved Coins
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
            <v-tab-item>
                <v-card>
                    <table class="mt-5" style="width: 100%">
                        <tr class="thead">
                            <th>#</th>
                            <th>Rank</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>24h Volume</th>
                            <th></th>
                            <th>Sparkline</th>
                        </tr>
                        <tr v-for="coin in displayCoinList" :key="coin.id" class="tbody">
                            <td><img :src="coin.iconUrl" alt="" /></td>
                            <td>{{ coin.rank }}</td>
                            <td>{{ coin.symbol }}</td>
                            <td>{{ coin.name }}</td>
                            <td>{{ coin.price }}</td>
                            <td>{{ coin.change }}</td>
                            <td>{{ coin.hVolume }}</td>
                            <td>
                                <v-btn color="teal" dark elevation="3" fab>
                                    <v-icon>mdi-star-outline</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-sparkline :value="coin.chart">
                                </v-sparkline>
                            </td>
                        </tr>
                    </table>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card>
                    <h2>Faved Coins</h2>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>

</template>

<script>
import axios from 'axios'
export default {
    name: 'CoinsComponent',
    data() {
        return {
            tabs: null,
            coinsList: [],
            displayCoinList: [],
            value: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
            ],
        }
    },
    mounted() {
        axios({
            method: "get",
            baseURL: "https://api.coinranking.com/v2/coins?",
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
            console.log(coins)
            //   console.log(coins);
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
    background: #009688;
    color: white;
}

tr.tbody td img {
    width: 30px;
    margin: 0px !important;
}
</style>