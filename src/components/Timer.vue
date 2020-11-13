<template>
  <div class='timer'>
    <div v-if="this.$store.state.pots[this.potIndex].must_drop_in">
      Must Drop In &#x1F551; {{ timeLeft }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    potIndex: Number,
  },
  computed: {
    timeLeft() {
      let seconds = Math.floor((this.$store.state.pots[this.potIndex].timeLeft / 1000) % 60),
        minutes = Math.floor((this.$store.state.pots[this.potIndex].timeLeft / (1000 * 60)) % 60),
        hours = Math.floor((this.$store.state.pots[this.potIndex].timeLeft / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return `${hours}:${minutes}:${seconds}`;
    },
    potType() {
      return this.$store.state.pots[this.potIndex].type;
    }
  },
};
</script>

<style>
.medium-grid > .details > .timer {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.timer {
  font-size: x-small;
}
</style>