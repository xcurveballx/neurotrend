<template>
    <div>
        <page-message v-if="isItemLoading" class="y-5">
            {{ loadingMsg }}
            <progress class="progress is-small is-primary" max="100"></progress>
        </page-message>
 
        <page-message v-if="isItemError" class="y-5">
            <i class="fas fa-bug"></i> {{ errorMsg }}
        </page-message>

        <trustee-form v-if="model == 'trustee'" :model="model" :id="id" :trustee="currentItem"/>
    </div>
</template>

<script>
import TrusteeForm from "@/components/forms/Trustee.vue";
import PageMessage from "@/components/PageMessage.vue";
import { mapGetters } from 'vuex';
import EventBus from '@/bus';

export default {
  name: "ItemForm",
  props: {
    model: {
      required: true,
      type: String
    },
    id: {
      required: false,
      type: String
    }
  },
  computed: {
    ...mapGetters(["isItemLoading", "isItemError", "loadingMsg", "errorMsg", "currentItem"])
  },
  components: {
    TrusteeForm,
    PageMessage
  },
  created() {
  },
  beforeRouteUpdate (to, from, next) {
    next();
  },
  beforeRouteLeave (to, from, next) {
    EventBus.$emit('ITEM_SELECTED', 0);
    next();
  }
};
</script>
