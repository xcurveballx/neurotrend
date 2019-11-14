<template>
<div class="columns">
    <div class="column">
        <page-message v-if="isLoading" class="y-5">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>

        <page-message v-if="isError" class="y-5">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <template v-if="$store.getters[`${model}/${model}`]">
            <br />
            <h1 class="is-size-3 is-uppercase has-text-centered has-text-weight-bold">
                {{ model | plural }}
            </h1>
            <br />
            <btn @click.native="add" class="is-normal is-info is-outlined is-fullwidth">
                <i class="fas fa-plus"></i> Add new item
            </btn>
            <br />
            <list :ths="ths" :model="model" :items="$store.getters[`${model}/${model}`]" :selected="selectedItemIndex"/>
        </template>
    </div>
    <div class="column is-half-tablet is-one-third-desktop">
        <br />
        <router-view />
    </div>
</div>
</template>

<script>
import Btn from "@/components/Button.vue";
import PageMessage from "@/components/PageMessage.vue";
import List from "@/components/List.vue";
import EventBus from '@/bus';
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
    }
  },
  methods: {
    add () {
      if (this.$route.name == 'add') return;
      EventBus.$emit('ITEM_SELECTED', -1);
      EventBus.$emit('SET_IS_LOADING', false);
      EventBus.$emit('SET_IS_ERROR', false);
      this.$router.push(`/${this.model}/add/`);
    }
  },
  computed: {
    ...mapGetters(["isLoading", "isError", "loadingMsg", "errorMsg", "selectedItemIndex"]),
  },
  filters: {
    plural: (val) => `${val}s`
  },
  components: {
    Btn,
    PageMessage,
    List
  },
  created () {
    EventBus.$emit('GET_MODEL', this.model);
  },
  beforeRouteUpdate (to, from, next) {
    if (this.selectedItemIndex != -1) {
      EventBus.$emit('ITEM_SELECTED', 0);
    }
    EventBus.$emit('GET_MODEL', to.params.model);
    next();
  },
  beforeRouteLeave (to, from, next) {
    if (this.selectedItemIndex != -1) {
      EventBus.$emit('ITEM_SELECTED', 0);
    }
    next();
  },
};
</script>
