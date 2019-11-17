<template>
    <div>
        <page-message v-if="isItemLoading">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>

        <page-message v-if="isItemError">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <dog v-if="!isItemLoading && !isItemError && currentItem && model == 'dog'" :dog="currentItem" :model="model" :id="id" :isInEditMode="isInEditMode"/>

        <payment v-if="currentItem && model == 'payment'" :payment="currentItem" :model="model" :id="id" :isInEditMode="isInEditMode"/>

        <trustee v-if="currentItem && model == 'trustee'" :trustee="currentItem" :model="model" :id="id" :isInEditMode="isInEditMode"/>
    </div>
</template>

<script>
import PageMessage from "@/components/PageMessage.vue";
import Dog from "@/components/dog/Dog.vue";
import Payment from "@/components/payment/Payment.vue";
import Trustee from "@/components/trustee/Trustee.vue";
import EventBus from '@/bus';
import { mapGetters } from 'vuex';

export default {
  name: "Item",
  props: {
    id: {
      required: true,
      type: String
    },
    model: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(["currentItem", "isItemLoading", "isItemError", "loadingMsg", "errorMsg", "isInEditMode"])
  },
  components: {
    PageMessage,
    Dog,
    Payment,
    Trustee
  },
  created() {
    let payload = {
      model: this.model,
      id: this.id
    };
    EventBus.$emit('GET_MODEL_BY_ID', payload);
  },
  beforeRouteUpdate(to, from, next) {
    let payload = {
      model: to.params.model,
      id: to.params.id
    };
    if (this.isInEditMode) {
      EventBus.$emit('TOGGLE_EDIT_MODE');
    }
    EventBus.$emit('HIDE_MENU_ON_MOB');
    EventBus.$emit('GET_MODEL_BY_ID', payload);
    EventBus.$emit('CLEAR_VALIDATION_ERRORS');
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (this.isInEditMode) {
      EventBus.$emit('TOGGLE_EDIT_MODE');
    }
    EventBus.$emit('CLEAR_CURRENT_ITEM', null);
    EventBus.$emit('HIDE_MENU_ON_MOB');
    EventBus.$emit('CLEAR_VALIDATION_ERRORS');
    next();
  },
};
</script>
