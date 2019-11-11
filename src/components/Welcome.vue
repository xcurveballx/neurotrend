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
  components: {
    Navigation
  }
};
</script>
