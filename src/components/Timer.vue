<template>
  <div class="timer">Must Drop In &#x1F551; {{ timeLeft }}</div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    timeLeft: String,
  },
};
</script>