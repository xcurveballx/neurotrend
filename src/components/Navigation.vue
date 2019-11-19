<template>
    <nav class="navbar has-background-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/home/" exact>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Dog.svg" height="52">
            </router-link>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click.prevent="toogleOnMobile">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{'is-block': isMenuShownOnMob}">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/dog/">Dogs</router-link>
                <router-link class="navbar-item" to="/trustee/">Trustees</router-link>
                <router-link class="navbar-item" to="/payment/">Payments</router-link>
            </div>
            <div class="navbar-end">
                <a @click.prevent="logout" class="navbar-item has-text-danger">Log out</a>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "Navigation",
    methods: {
        logout() {
            this.$eventBus.$emit('LOGOUT');
        },
        toogleOnMobile() {
            this.$eventBus.$emit('TOGGLE_MENU_ON_MOB');
        }
    },
    computed: {
        ...mapGetters(["isMenuShownOnMob"])
    },
};
</script>
