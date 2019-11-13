<template>
    <div>
        <page-message v-if="isItemLoading">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>

        <page-message v-if="isItemError">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <payment-card v-if="currentItem && currentItem.id && model == 'payment'" :payment="currentItem" />

        <dog-card v-if="currentItem && currentItem.id && model == 'dog'" :dog="currentItem" />

        <trustee-card v-if="currentItem && currentItem.id && model == 'trustee'" :trustee="currentItem" />
    </div>
</template>

<script>
import PageMessage from "@/components/PageMessage.vue";
import DogCard from "@/components/cards/Dog.vue";
import TrusteeCard from "@/components/cards/Trustee.vue";
import PaymentCard from "@/components/cards/Payment.vue";
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
    ...mapGetters(["currentItem", "isItemLoading", "isItemError", "loadingMsg", "errorMsg"])
  },
  components: {
    PageMessage,
    PaymentCard,
    DogCard,
    TrusteeCard
  },
  created() {
    let payload = {
      model: this.model,
      id: this.id
    };
    EventBus.$emit('GET_MODEL_BY_ID', payload);
  },
  beforeRouteUpdate (to, from, next) {
    let payload = {
      model: to.params.model,
      id: to.params.id
    };
    EventBus.$emit('GET_MODEL_BY_ID', payload);
    next();
  }
};
</script>
