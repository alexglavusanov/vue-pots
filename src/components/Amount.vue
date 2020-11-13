<template>
  <div class="amount">
    <img v-if='isBig' src='/assets/box.png' />
    <div :class="isInBox" :id="`amount${potIndex}`">{{ potAmount }}</div>
  </div>
</template>

<script>
import changeValue from "./../lib/countUp.js";

export default {
  name: "Amount",
  props: {
    potIndex: Number,
  },
  mounted() {
    this.$nextTick(function () {
      if (this.potAmount === '$0.00') this.reloadAmount();
    })
  },
  data: function () {
    return {};
  },
  computed: {
    potAmount() {
      if (!document.getElementById(`amount${this.potIndex}`)) {
        return `${
          this.$store.state.pots[this.potIndex].currency
        }${(this.$store.state.pots[this.potIndex].amount.toFixed(2) - this.$store.state.pots[this.potIndex].amount.toFixed(2)).toFixed(2)}`;
      }

      return changeValue(
        document.getElementById(`amount${this.potIndex}`),
        this.$store.state.pots[this.potIndex].currency,
        this.$store.state.pots[this.potIndex].amount.toFixed(2),
        this.$store.state.pots[this.potIndex].prevAmount
      );
    },
    potType() {
      return this.$store.state.pots[this.potIndex].type;
    },
    isBig() {
      return (this.potType === 'big');
    },
    isInBox() {
      return this.isBig ? 'is-in-box' : null;
    }
  },
  methods: {
    reloadAmount () {
      changeValue(
        document.getElementById(`amount${this.potIndex}`),
        this.$store.state.pots[this.potIndex].currency,
        this.$store.state.pots[this.potIndex].amount.toFixed(2),
        this.$store.state.pots[this.potIndex].prevAmount
      )
    },
  },
  destroyed() {
    this.$store.commit("clearIntervals");
  },
};
</script>

<style>
.medium-grid > .details > .amount {
  font-size: x-large;
}

.amount {
  color: gold;
}

.big-grid > .details > .amount {
  position: relative;
  grid-row: 4 / 5;
  font-size: xx-large;
}

.big-grid > .details > .amount > img {
  position:relative;
}

.is-in-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>