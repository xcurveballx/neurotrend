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
            <btn class="is-normal is-info is-outlined is-fullwidth">
                <i class="fas fa-plus"></i>
                &nbsp;&nbsp;Add new item
            </btn>
            <br />
            <list :ths="ths" :model="model" :items="$store.getters[`${model}/${model}`]" :selected="selected"/>
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
      ths: ['#', 'Item', 'Additional Info'],
      selected: 0
    };
  },
  props: {
    model: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(["isLoading", "isError", "loadingMsg", "errorMsg"])
  },
  filters: {
    plural (val) {
      return `${val}s`;
    }
  },
  components: {
    Btn,
    PageMessage,
    List
  },
  created () {
    EventBus.$emit('GET_MODEL', this.model);
  },
  mounted () {
    EventBus.$on('ITEM_SELECTED', index => {this.selected = index});
  },
  beforeRouteUpdate (to, from, next) {
    this.selected = 0;
    EventBus.$emit('GET_MODEL', to.params.model);
    next();
  },
};
</script>
