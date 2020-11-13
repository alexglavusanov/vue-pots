<template>
  <div id="jackpot-feed">

    <Pot 
    v-for="(pot, index) in pots"
    :key="index"
    :potIndex="index" />

  </div>
</template>

<script>
import store from './store/store.js';
import Pot from './components/Pot.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'JackpotFeed',
  data() {
    return {
      potIndex: 0,
    }
  },
  store,
  components: {
    Pot,
  },
  created() {
    this.$store.dispatch('loadPots');
    this.$store.dispatch('initializeSecondsTimer');
    this.$store.dispatch('initializeHalfMinuteTimer');
  },
  computed: mapGetters([
    'pots',
  ]),
  destroyed() {
    this.$store.commit('clearIntervals');
  },
}
</script>

<style>
#jackpot-feed {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;

  height: 100vh;
  min-height: 320px;
  max-width: 300px;
  min-width: 150px;
  width: 20vw;

  background-image: url("/assets/bg.png");

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
