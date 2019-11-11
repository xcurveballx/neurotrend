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
    ...mapGetters("global", ["apiKey"]),
    ...mapGetters("dogs", ["dogs"])
  },
  methods: {
    ...mapMutations("global", ["setApiKey"]),
    ...mapActions("global", ["login", "logout"]),
    ...mapMutations("dogs", ["setDogs"]),
    ...mapActions("dogs", ["fetchDogs"])
  },
  mounted () {
    EventBus.$on('LOGIN', this.login);
    EventBus.$on('LOGOUT', this.logout);
    EventBus.$on('FETCH_DOGS', this.fetchDogs);
  }
};
</script>
