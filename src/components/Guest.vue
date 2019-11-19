<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <about title="About shelters" />
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
}
</script>
