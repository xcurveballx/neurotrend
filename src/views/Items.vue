<template>
<div class="columns">
    <div class="column">
        <page-message v-if="isLoading">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>

        <page-message v-if="isError">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <template v-if="!isLoading && !isError && $store.getters[`${model}/${model}`]">
            <br />
            <h1 class="is-size-3 is-uppercase has-text-centered has-text-weight-bold">
                {{ model | plural }}
            </h1>
            <br />
            <btn @click.native="add" class="is-normal is-info is-outlined is-fullwidth">
                <i class="fas fa-plus"></i> Add new item
            </btn>
            <br />
            <list :ths="ths" :model="model" :items="$store.getters[`${model}/${model}`]" :selected="selectedItemIndex" :trick="trick"/>
        </template>
    </div>
    <div class="column is-half-tablet is-one-third-desktop">
        <br />
        <router-view />
    </div>
</div>
</template>

<script>
import List from "@/components/List.vue";
import { mapGetters } from 'vuex';

export default {
    name: "Items",
    data() {
        return {
            ths: ['#', 'Item', 'Additional Info']
        }
    },
    props: {
        model: {
            required: true,
            type: String
        },
        trick: {
            required: true,
            type: Number
        }
    },
    methods: {
      add() {
          if (this.$route.name == 'add') return;
          this.$eventBus.$emit('ITEM_SELECTED', -1);
          this.$eventBus.$emit('SET_IS_LOADING', false);
          this.$eventBus.$emit('SET_IS_ERROR', false);
          this.$router.push(`/${this.model}/add/`);
      }
    },
    computed: {
        ...mapGetters(["isLoading", "isError", "loadingMsg", "errorMsg", "selectedItemIndex"]),
    },
    components: {
        List
    },
    created() {
        this.$eventBus.$emit('GET_MODEL', this.model);
    },
    beforeRouteUpdate(to, from, next) {
        if (this.selectedItemIndex != -1) {
            this.$eventBus.$emit('ITEM_SELECTED', 0);
        }
        this.$eventBus.$emit('HIDE_MENU_ON_MOB');
        this.$eventBus.$emit('GET_MODEL', to.params.model);
        next();
    },
    beforeRouteLeave (to, from, next) {
        if (this.selectedItemIndex != -1) {
            this.$eventBus.$emit('ITEM_SELECTED', 0);
        }
        this.$eventBus.$emit('HIDE_MENU_ON_MOB');
        next();
    },
};
</script>
