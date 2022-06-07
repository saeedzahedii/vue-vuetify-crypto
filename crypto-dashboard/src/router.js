import Home from './components/Home'
import NavBar from './components/NavBar'
import Coins from './components/Coins'
import CoinDetail from './components/CoinDetail'
import Search from './components/Search'

export default [{
    path: '/', component: Home
},
{
    path: '/navbar', component: NavBar
},
{
    path: '/search', component: Search
},
{
    path: '/coins', component: Coins
},
{
    path: '/coins/:uuid',name:'coindetail', component: CoinDetail
}
]