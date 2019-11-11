<template>
  <div id="app">
    <app-notification v-show="Object.keys(notifications).length" :notifications="notifications" />
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppNotification from "@/components/Notification.vue";
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";
import EventBus from '@/bus';

export default {
  name: "App",
  data() {
    return {
      notifications: new Map()
    };
  },
  methods: {
    showNotification: function({message, type}) {
      let notification = {};
      notification.message = message;
      notification.type = type;
      notification.id = + new Date();

      this.notifications.set(notification.id, notification);
      //setTimeout(this.hideNotification, 3000);
    },
    hideNotification: function(key) {
      delete this.notifications[key];
    }
  },
  components: {
    AppNotification,
    AppHeader,
    AppFooter
  },
  mounted () {
    EventBus.$on('SHOW_NOTIFICATION', this.showNotification);
    EventBus.$on('REMOVE_NOTIFICATION', this.hideNotification);
  }
};
</script>
