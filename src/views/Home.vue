<template>
    <page-message class="y-5">
        <strong>Hi, {{ userName | uppercase }}!</strong> Use the navigation links above to visit corresponding page.
    </page-message>
</template>

<script>
import PageMessage from "@/components/PageMessage.vue";

export default {
  name: "Home",
  data() {
    return {
      userName: this.$store.getters.user
    };
  },
  components: {
    PageMessage
  },
  filters: {
    uppercase(val) {
      return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
    }
  }
};
</script>
