<template>
    <div>
        <page-message v-if="isItemLoading" class="y-5">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>

        <page-message v-if="isItemError" class="y-5">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <trustee-form v-if="model == 'trustee'" :model="model" :id="false" :trustee="false"/>

        <dog-form v-if="model == 'dog'" :model="model" :id="false" :dog="false"/>

        <payment-form v-if="model == 'payment'" :model="model" :id="false" :payment="false"/>
    </div>
</template>

<script>
import TrusteeForm from "@/components/trustee/form.vue";
import DogForm from "@/components/dog/form.vue";
import PaymentForm from "@/components/payment/form.vue";
import PageMessage from "@/components/PageMessage.vue";
import { mapGetters } from 'vuex';
import EventBus from '@/bus';

export default {
  name: "AddForm",
  props: {
    model: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(["isItemLoading", "isItemError", "loadingMsg", "errorMsg"])
  },
  components: {
    TrusteeForm,
    DogForm,
    PaymentForm,
    PageMessage
  },
  beforeRouteLeave(to, from, next) {
    EventBus.$emit('ITEM_SELECTED', 0);
    EventBus.$emit('HIDE_MENU_ON_MOB');
    next();
  }
};
</script>
