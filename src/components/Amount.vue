<template>
  <div class="amount">
    <div class="amount-string">{{ funds }}</div>
  </div>
</template>

<script>
export default {
  name: "Amount",
  props: {
    id: Number,
    funds: String,
  },
};
</script>