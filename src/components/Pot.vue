<template>
  <div class="pot" :class="this.type">
    <img :src="this.imageURL" class="pot-avatar" />
    <div class="details">
      <Amount :id="this.id" :funds="this.funds" />
      <Timer v-if="this.must_drop_in" :timeLeft="this.timeLeft" />
    </div>
  </div>
</template>

<script>
import Amount from "./Amount.vue";
import Timer from "./Timer.vue";

export default {
  name: "Pot",
  components: {
    Amount,
    Timer,
  },
  props: {
    id: Number,
    timeLeft: String,
    must_drop_in: String,
    funds: String,
    imageURL: String,
    type: String,
  },
};
</script>