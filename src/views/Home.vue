<template>
    <guest v-if="!apiKey"></guest>
    <welcome v-else></welcome>
</template>

<script>
import Guest from "@/components/Guest.vue";
import Welcome from "@/components/Welcome.vue";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import EventBus from '@/bus';

export default {
  name: "home",
  components: {
    Welcome,
    Guest
  },
  computed: {
    ...mapGetters("global", ["apiKey"])
  },
  methods: {
    ...mapMutations("global", ["setApiKey"]),
    ...mapActions("global", ["login", "logout"])
  },
  mounted () {
    EventBus.$on('LOGIN', this.login);
    EventBus.$on('LOGOUT', this.logout);
  }
};
</script>
