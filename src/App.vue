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
import { mapActions, mapMutations, mapGetters } from 'vuex';
import EventBus from '@/bus';

export default {
    name: "App",
    computed: {
        ...mapGetters(["notifications"])
    },
    methods: {
        ...mapActions(["login", "logout", "getModel", "getModelById", "updateModel", "createModel", "removeModelById", "createNotification"]),
        ...mapMutations(["setSelectedItemIndex", "setIsLoading", "setIsError", "toggleEditMode", "setCurrentItem", "toggleIsMenuShownOnMob", "clearIsMenuShownOnMob", "setValidationErrors", "clearNotification"])
    },
    components: {
        AppNotification,
        AppHeader,
        AppFooter
    },
    mounted() {
        EventBus.$on('SHOW_NOTIFICATION', this.createNotification);
        EventBus.$on('REMOVE_NOTIFICATION', this.clearNotification);
        EventBus.$on('LOGIN', this.login);
        EventBus.$on('LOGOUT', this.logout);
        EventBus.$on('GET_MODEL', this.getModel);
        EventBus.$on('GET_MODEL_BY_ID', this.getModelById);
        EventBus.$on('UPDATE_MODEL', this.updateModel);
        EventBus.$on('CREATE_MODEL', this.createModel);
        EventBus.$on('REMOVE_MODEL_BY_ID', this.removeModelById);
        EventBus.$on('ITEM_SELECTED', this.setSelectedItemIndex);
        EventBus.$on('SET_IS_LOADING', this.setIsLoading);
        EventBus.$on('SET_IS_ERROR', this.setIsError);
        EventBus.$on('TOGGLE_EDIT_MODE', this.toggleEditMode);
        EventBus.$on('CLEAR_CURRENT_ITEM', this.setCurrentItem);
        EventBus.$on('TOGGLE_MENU_ON_MOB', this.toggleIsMenuShownOnMob);
        EventBus.$on('HIDE_MENU_ON_MOB', this.clearIsMenuShownOnMob);
        EventBus.$on('CLEAR_VALIDATION_ERRORS', this.setValidationErrors);
    }
};
</script>
