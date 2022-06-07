<template>
    <v-app>
        <!-- {{ $route.params.uuid }} -->
        <v-card class="pa-5">
            <v-card flat class="d-flex justify-space-between py-5">
                <v-card flat class="d-flex justify-start align-center">
                    <img class="mr-3" :src="coinDetail.iconUrl" alt="">
                    <span class="font-weight-black">{{ coinDetail.name }} - {{ coinDetail.symbol }} <span
                            :style="{ color: (coinDetail.change > 0) ? 'green' : 'red' }" class="ml-5"><span
                                v-if="coinDetail.change > 0">+</span><span v-if="coinDetail.change < 0">-</span> {{
                                        coinDetail.change
                                }} %</span>
                    </span>
                </v-card>
                <v-card flat>
                    <a :href="coinDetail.websiteUrl" target="_blank">
                        <v-btn outlined color="primary">
                            See Website <v-icon class="ml-2">mdi-web</v-icon>
                        </v-btn>
                    </a>
                </v-card>
            </v-card>
            <v-divider class="pb-5"></v-divider>
            <v-card flat v-html="coinDetail.description">
            </v-card>
        </v-card>
        <v-card flat class="d-flex justify-start py-5 mt-1">
            <a v-for="link in coinDetail.links" :key="link.id" :href="link.url" target="_blank">
                <v-btn outlined color="primary" class="mr-3">
                    {{ link.type }}
                </v-btn>
            </a>
        </v-card>
        <v-card flat class="d-flex" dark>
            <v-card flat class="d-flex mt-2">
                <v-card flat class="pa-5" width="250px">
                    <p>Market Cap <br> {{ coinDetail.marketCap }} </p>
                    <v-divider class="pb-5"></v-divider>
                    <p>number of Exchanges <br> {{ coinDetail.numberOfExchanges }} </p>
                    <v-divider class="pb-5"></v-divider>
                    <p>number of Markets <br> {{ coinDetail.numberOfMarkets }} </p>
                </v-card>
                <v-card flat class="pa-5 mx-2" width="250px">
                    <p>Price of Coin <br> {{ coinDetail.price }} </p>
                    <v-divider class="pb-5"></v-divider>
                    <p>Rank of Coin <br> {{ coinDetail.rank }} </p>
                    <v-divider class="pb-5"></v-divider>
                    <p> Number of Circulating Coins <br> {{ coinDetail.supply.circulating }} </p>
                </v-card>
            </v-card>
            <v-sparkline color="yellow" line-width="1" padding="25" smooth="0" :value="getSparkLine(coinDetail.sparkline)">
            </v-sparkline>
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            coinDetail: [],
        }
    },
    // methods: {
    //     generateList(coins) {
    //         coins.chart = coins.sparkline.map(data => {
    //             return Number(data);
    //         })
    //         console.log(coins)
    //     },
    // },
    mounted() {
        axios({
            method: "get",
            baseURL: `https://api.coinranking.com/v2/coin/${this.$route.params.uuid}`,
            headers: {
                "x-access-token": `token ${this.$access_token}`,
            },
        })
            .then((resultat) => {
                this.coinDetail = resultat.data.data.coin;
                // this.generateList(this.coinDetail);
                console.log(this.coinDetail)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        getSparkLine(sparkline) {
            let sparkArry = [];
            for (var i = 0; i < sparkline.length; i++) {
                sparkArry[i] = Number(sparkline[i]);
            }
            return sparkArry;
        }
    }
}
</script>
<style>
img {
    width: 50px;
}

a {
    text-decoration: none;
}
</style>