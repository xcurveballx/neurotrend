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
        this.$eventBus.$on('SHOW_NOTIFICATION', this.createNotification);
        this.$eventBus.$on('REMOVE_NOTIFICATION', this.clearNotification);
        this.$eventBus.$on('LOGIN', this.login);
        this.$eventBus.$on('LOGOUT', this.logout);
        this.$eventBus.$on('GET_MODEL', this.getModel);
        this.$eventBus.$on('GET_MODEL_BY_ID', this.getModelById);
        this.$eventBus.$on('UPDATE_MODEL', this.updateModel);
        this.$eventBus.$on('CREATE_MODEL', this.createModel);
        this.$eventBus.$on('REMOVE_MODEL_BY_ID', this.removeModelById);
        this.$eventBus.$on('ITEM_SELECTED', this.setSelectedItemIndex);
        this.$eventBus.$on('SET_IS_LOADING', this.setIsLoading);
        this.$eventBus.$on('SET_IS_ERROR', this.setIsError);
        this.$eventBus.$on('TOGGLE_EDIT_MODE', this.toggleEditMode);
        this.$eventBus.$on('CLEAR_CURRENT_ITEM', this.setCurrentItem);
        this.$eventBus.$on('TOGGLE_MENU_ON_MOB', this.toggleIsMenuShownOnMob);
        this.$eventBus.$on('HIDE_MENU_ON_MOB', this.clearIsMenuShownOnMob);
        this.$eventBus.$on('CLEAR_VALIDATION_ERRORS', this.setValidationErrors);
    }
};
</script>
