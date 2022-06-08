<template>
    <v-card dark class="pa-5">

        <v-tabs left v-model="tabs">
            <v-tab>
                <v-icon>mdi-currency-btc</v-icon> Coins
            </v-tab>
            <v-tab>
                <v-icon>mdi-swap-horizontal</v-icon> Exchanges
            </v-tab>
            <v-tab>
                <v-icon>mdi-shopping-outline</v-icon> Markets
            </v-tab>
        </v-tabs>

        <v-tabs-items dark v-model="tabs">
            <v-tab-item>
                <v-card class="mt-5 pt-3">
                    <v-text-field label="Search Coins" clearable @keypress="onSearchCoin" v-model="coinQuerry">
                        <v-icon slot="prepend">
                            mdi-magnify
                        </v-icon>
                    </v-text-field>

                    <table v-if="this.display && this.displayCoinList.length > 0" class="mt-5" style="width: 100%">
                        <thead>
                            <tr class="thead">
                                <th>#</th>
                                <th>Order</th>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>USD Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(coin, index) in displayCoinList" :key="coin.id" class="tbody">
                                <td><img :src="coin.iconUrl" alt="" /></td>
                                <td>{{ index + 1 }}</td>
                                <td>{{ coin.symbol }}</td>
                                <td>
                                    <router-link :to="{ name: 'coindetail', params: { uuid: coin.uuid } }">{{ coin.name
                                    }}
                                    </router-link>
                                </td>
                                <td>{{ coin.price }}</td>
                                <td>{{ coin.usdPrice }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <v-alert color="yellow" outlined v-if="!this.display || this.displayCoinList.length == 0"
                        border="right">
                        No Result Yet
                    </v-alert>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card class="mt-5 pt-3">
                    <v-text-field label="Search Exchanges" clearable @keypress="onSearchExchange"
                        v-model="exchangeQuerry">
                        <v-icon slot="prepend">
                            mdi-magnify
                        </v-icon>
                    </v-text-field>

                    <table v-if="this.display && this.exchangeList.length > 0" style="width: 100%">
                        <thead>
                            <tr class="thead">
                                <th></th>
                                <th>#</th>
                                <th>Name</th>
                                <th>Is Recommended ?</th>
                                <!-- <th></th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(exchange, index) in exchangeList" :key="exchange.id" class="tbody">
                                <td><img :src="exchange.iconUrl" alt="" /></td>
                                <td>{{ index + 1 }}</td>
                                <td>{{ exchange.name }}</td>
                                <td v-if="exchange.recommended">Yes</td>
                                <td v-if="!exchange.recommended">No</td>
                                <!-- <td>
                          <b-button variant="dark">
                            <b-icon icon="star"></b-icon>
                          </b-button>
                        </td> -->
                            </tr>
                        </tbody>
                    </table>
                    <v-alert color="yellow" outlined v-if="!this.display || this.exchangeList.length == 0"
                        border="right">
                        No Result Yet
                    </v-alert>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card class="mt-5 pt-3">
                    <v-text-field label="Search Markets" clearable @keypress="onSearchMarket" v-model="marketQuerry">
                        <v-icon slot="prepend">
                            mdi-magnify
                        </v-icon>
                    </v-text-field>

                    <table v-if="this.display && this.marketsList.length > 0" style="width: 100%">
                        <thead>
                            <tr class="thead">
                                <th>#</th>
                                <th>Order</th>
                                <th>Market Name</th>
                                <th>Coin Symbol</th>
                                <th>Quote Symbol</th>
                                <th>Is Recommended ?</th>
                                <!-- <th></th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(market, index) in marketsList" :key="market.id" class="tbody">
                                <td><img :src="market.exchangeIconUrl" alt="" /></td>
                                <td>{{ index + 1 }}</td>
                                <td>{{ market.exchangeName }}</td>
                                <td>{{ market.baseSymbol }}</td>
                                <td>{{ market.quoteSymbol }}</td>
                                <td v-if="market.recommended">Yes</td>
                                <td v-if="!market.recommended">No</td>
                                <!-- <td>
                          <b-button variant="dark">
                            <b-icon icon="star"></b-icon>
                          </b-button>
                        </td> -->
                            </tr>
                        </tbody>
                    </table>
                    <v-alert color="yellow" outlined v-if="!this.display || this.marketsList.length == 0"
                        border="right">
                        No Result Yet
                    </v-alert>
                </v-card>
            </v-tab-item>
            <v-tab-item></v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SearchComponent',
    data() {
        return {
            coinQuerry: '',
            exchangeQuerry: '',
            marketQuerry: '',
            tabs: null,
            coinsList: [],
            displayCoinList: [],
            exchangeList: [],
            marketsList: [],
            display: false
        }
    },

    methods: {
        onSearchCoin(e) {
            if (e.key == "Enter") {
                axios({
                    method: "get",
                    baseURL: `https://api.coinranking.com/v2/search-suggestions?query=${this.coinQuerry}`,
                    headers: {
                        "x-access-token": `token ${this.$access_token}`,
                    },
                })
                    .then((result) => {
                        this.coinsList = result.data.data.coins;
                        this.displayCoinList = this.coinsList;
                        // console.log(this.coinsList);
                        this.display = true;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        onSearchExchange(e) {
            if (e.key == "Enter") {
                axios({
                    method: "get",
                    baseURL: `https://api.coinranking.com/v2/search-suggestions?query=${this.exchangeQuerry}`,
                    headers: {
                        "x-access-token": `token ${this.$access_token}`,
                    },
                })
                    .then((result) => {
                        this.exchangeList = result.data.data.exchanges;
                        // console.log(this.exchangeList);
                        this.display = true;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        onSearchMarket(e) {
            if (e.key == "Enter") {
                axios({
                    method: "get",
                    baseURL: `https://api.coinranking.com/v2/search-suggestions?query=${this.marketQuerry}`,
                    headers: {
                        "x-access-token": `token ${this.$access_token}`,
                    },
                })
                    .then((result) => {
                        this.marketsList = result.data.data.markets;
                        // console.log(this.marketsList);
                        this.display = true;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
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

tr.tbody td img {
    width: 60px;
    height: 60px;
    margin: 0px !important;
    background: white;
    border-radius: 100px;
}

tr.thead {
    background: #ffe600;
    color: #000;
}
</style>