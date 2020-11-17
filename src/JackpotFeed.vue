<template>
  <div id="app">
    <div id="pots-container">
      <Pot
        v-for="(pot, index) in pots"
        :key="index"
        :id="index"
        :imageURL="imageURL(index)"
        :timeLeft="timeLeft(index)"
        :must_drop_in="pot.must_drop_in"
        :funds="funds(index)"
        :type="type(index)"
      />
    </div>
  </div>
</template>

<script>
import store from "./store/store.js";
import Pot from "./components/Pot.vue";
import { mapGetters } from "vuex";

export default {
  name: "JackpotFeed",
  store,
  components: {
    Pot,
  },
  created() {
    this.$store.dispatch("loadPots");
    this.$store.dispatch("initializeSecondsTimer");
    this.$store.dispatch("initializeHalfMinuteTimer");
  },
  computed: mapGetters(["pots", "timeLeft", "funds", "imageURL", "type"]),
  destroyed() {
    this.$store.commit("clearIntervals");
  },
};
</script>

<style>
@font-face {
  font-family: "Amiri-Bold";
  src: url("/assets/fonts/Amiri-Bold.ttf");
}

#app {
  height: 100vh;
  min-height: 320px;
  width: 20vw;
  max-width: 300px;
  min-width: 150px;

  background-image: url("/assets/bg.png");
  background-size: cover;

  color: aliceblue;
}

#pots-container {
  width: 18vw;
  max-width: 280px;
  min-width: 130px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 15px;

  background: rgba(111, 137, 225, 0.03);
  border-radius: 12px;
}

.pot {
  display: grid;
  align-items: center;

  margin: 5px 0px;

  background: rgba(111, 137, 225, 0.06);
}

.amount {
  font-family: "Amiri-Bold", Arial, sans-serif;
}

.amount-string {
  background: linear-gradient(#FFF447, #B5AD1D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.timer {
  background-color: rgba(7, 13, 31, 0.8);
  border-radius: 8px;

  font-family: Arial, Helvetica, sans-serif;

  padding: 4px;
}

.big {
  grid-template-rows: 65% 35%;
}

.big > .details {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-self: stretch;
}

.big > .details > .amount {
  align-content: center;

  font-size: 2.6vw;

  background-image: url("/assets/box.png");
  background-size: 100% 100%;
}

.big > .details > .timer {
  font-size: 1vw;
  margin: 20px 0px 0px;
  align-self: center;
}

.medium {
  grid-template-columns: 40% 60%;
  padding: 10px 5px;

  background-image: url("/assets/stars.png");
  background-size: cover;
  background-position: 50% -15px;
}

.medium > .details {
  grid-column-start: 2;

  margin: 10px 0px 10px 10px;
}

.medium > .details > .amount {
  font-size: 1.8vw;
}

.medium > .details > .timer {
  font-size: 0.6vw;
}

.pot-avatar {
  max-width: 100%;
}

.big > .pot-avatar {
  max-width: 140%;
  justify-self: center;
  align-self: start;
}

@media (max-width: 750px) {
  .big > .details > .amount {
    font-size: 19.5px;
  }
  .medium > .details > .amount {
    font-size: 13.5px;
  }
  .big > .details > .timer {
    font-size: 7.5px;
  }
  .medium > .details > .timer {
    font-size: 4.5px;
  }
}

@media (min-width: 1500px) {
  .big > .details > .amount {
    font-size: 39px;
  }
  .medium > .details > .amount {
    font-size: 27px;
  }
  .big > .details > .timer {
    font-size: 15px;
  }
  .medium > .details > .timer {
    font-size: 9px;
  }
}

@media (max-width: 1500px);
</style>
