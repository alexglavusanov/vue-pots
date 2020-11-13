<template>
  <div class='pot' :class="potType">
    <div :class="gridType">
      <img :src="image" class="pot-avatar" />
      <div class="details">
        <Amount :potIndex="this.potIndex" />
        <Timer :potIndex="this.potIndex" />
      </div>
    </div>
  </div>
</template>

<script>
import Amount from "./Amount.vue";
import Timer from "./Timer.vue";
import store from "./../store/store.js";

export default {
  name: "Pot",
  components: {
    Amount,
    Timer,
  },
  store,
  props: {
    potIndex: Number,
  },
  computed: {
    image() {
      let name;
      switch (this.$store.state.pots[this.potIndex].imageType) {
        case "daily_drop":
          name = "1.png";
          break;
        case "super_drop":
          name = "2.png";
          break;
        case "hourly_drop":
          name = "3.png";
          break;
      }

      return `/assets/${name}`;
    },
    potType() {
      return this.$store.state.pots[this.potIndex].type;
    },
    gridType() {
      return `${this.potType}-grid`;
    },
  },
};
</script>

<style>
img {
  width: 100%;
  max-height: 100%;
}

.pot {
  margin-bottom: 16px;
}

.medium-grid > .pot-avatar {
  margin-left: 10px;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.details > .timer {
  flex-grow: 1;
}

.details > .amount {
  flex-grow: 1;
}

.medium > img {
  grid-column: 1 / 2;
}

.medium-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  align-items: center;
  background-image: url('/assets/stars.png');
  background-size: cover;
}

.big-grid {
  display: grid;
  grid-template-rows: 3fr 1fr;
}
</style>