<template>
    <page-message class="y-5">
        <strong>Hi, {{ userName | uppercase }}!</strong> Use the navigation links above to visit corresponding page.
    </page-message>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            userName: this.$store.getters.user
        };
    },
    beforeRouteLeave(to, from, next) {
      this.$eventBus.$emit('HIDE_MENU_ON_MOB');
      next();
    }
};
</script>
