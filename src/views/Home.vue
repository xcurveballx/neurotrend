<template>
    <page-message class="y-5">
        <strong>Hi, {{ userName | uppercase }}!</strong> Use the navigation links above to visit corresponding page.
    </page-message>
</template>

<script>
import PageMessage from "@/components/PageMessage.vue";
import EventBus from '@/bus';

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
    beforeRouteLeave(to, from, next) {
      EventBus.$emit('HIDE_MENU_ON_MOB');
      next();
    }
};
</script>
