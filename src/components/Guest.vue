<template>
<section class="section has-background-light">
<div class="container">
    <div class="columns">
        <about />
        <login />
    </div>
</div>
</section>
</template>

<script>
import About from "@/components/About.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Guest",
  components: {
    About,
    Login
  }
};
</script>
