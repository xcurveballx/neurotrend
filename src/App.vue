<template>
  <div id="app">
    <app-notification v-show="notifications.length" :notifications="notifications" />
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppNotification from "@/components/Notification.vue";
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import EventBus from '@/bus';

export default {
  name: "App",
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    ...mapGetters(["apiKey"]),
    ...mapGetters("dogs", ["dogs"])
  },
  methods: {
    showNotification: function({message, type}) {
      let notification = {};
      notification.message = message;
      notification.type = type;
      notification.id = + new Date();

      this.notifications.push(notification);
      setTimeout(this.removeNotification, 5000, notification.id);
    },
    removeNotification: function(key) {
      this.notifications = this.notifications.filter(el => el.id != key);
    },
    ...mapMutations(["setApiKey"]),
    ...mapActions(["login", "logout"]),
    ...mapMutations("dogs", ["setDogs"]),
    ...mapActions("dogs", ["fetchDogs"])
  },
  components: {
    AppNotification,
    AppHeader,
    AppFooter
  },
  mounted () {
    EventBus.$on('SHOW_NOTIFICATION', this.showNotification);
    EventBus.$on('REMOVE_NOTIFICATION', this.removeNotification);
    EventBus.$on('LOGIN', this.login);
    EventBus.$on('LOGOUT', this.logout);
    //EventBus.$on('FETCH_MODEL', this.fetchDogs);
  }
};
</script>
