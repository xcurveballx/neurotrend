<template>
  <div id="app">
    <app-notification v-show="notification.isShown" :type="notification.type">
        {{ notification.message }}
    </app-notification>
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
      notification: {
        message: '',
        isHidden: true,
        type: ''
      }
    };
  },
  methods: {
    showNotification: function({message, type}) {
      this.notification.message = message;
      this.notification.type = type;
      this.notification.isShown = true;
      setTimeout(this.hideNotification, 5000);
    },
    hideNotification: function() {
      if (this.notification.isShown == false) return;
      this.notification.isShown = false;
      this.notification.message = '';
      this.notification.type = '';
    }
  },
  components: {
    AppNotification,
    AppHeader,
    AppFooter
  },
  mounted () {
    EventBus.$on('SHOW_NOTIFICATION', this.showNotification);
    EventBus.$on('HIDE_NOTIFICATION', this.hideNotification);
  }
};
</script>
