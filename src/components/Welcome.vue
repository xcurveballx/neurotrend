<template>
<section class="section is-size-5">
<div class="container">
    <navigation />
</div>
<div class="container">
    <router-view />
</div>
</section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "Welcome",
  data() {
    return {
      userName: this.$store.getters['global/user']
    };
  },
  components: {
    Navigation
  },
  filters: {
    uppercase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  }
};
</script>
