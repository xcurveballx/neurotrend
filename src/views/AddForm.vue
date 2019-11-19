<template>
    <div>
        <page-message v-if="isItemLoading">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>

        <page-message v-if="isItemError">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <trustee-form v-if="!isItemLoading && !isItemError && model == 'trustee'" :model="model" :id="false" :trustee="false"/>

        <dog-form v-if="!isItemLoading && !isItemError && model == 'dog'" :model="model" :id="false" :dog="false"/>

        <payment-form v-if="!isItemLoading && !isItemError && model == 'payment'" :model="model" :id="false" :payment="false"/>
    </div>
</template>

<script>
import TrusteeForm from "@/components/trustee/form.vue";
import DogForm from "@/components/dog/form.vue";
import PaymentForm from "@/components/payment/form.vue";
import { mapGetters } from 'vuex';

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
        PaymentForm
    },
    beforeRouteLeave(to, from, next) {
        this.$eventBus.$emit('ITEM_SELECTED', 0);
        this.$eventBus.$emit('HIDE_MENU_ON_MOB');
        this.$eventBus.$emit('CLEAR_VALIDATION_ERRORS');
        next();
    }
};
</script>
