import Vue from 'vue'
import JackpotFeed from './JackpotFeed.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(JackpotFeed),
}).$mount('#jackpot-feed')
