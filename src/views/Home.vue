<template>
<div class="notification has-text-centered is-italic y-5">
      <strong>Hi, {{ userName | uppercase }}!</strong> Use the navigation links above to visit corresponding page.
</div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userName: this.$store.getters['global/user']
    };
  },
  filters: {
    uppercase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  }
};
</script>
