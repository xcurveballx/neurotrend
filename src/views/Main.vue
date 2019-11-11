<template>
    <guest v-if="!$store.getters.apiKey" />
    <welcome v-else />
</template>

<script>
import Guest from "@/components/Guest.vue";
import Welcome from "@/components/Welcome.vue";

export default {
  components: {
    Welcome,
    Guest
  }
};
</script>
