<template>
    <trustee-form v-if="isInEditMode" :trustee="trustee" :model="model" :id="id" />
    <trustee-card v-else :trustee="trustee" :model="model" :id="id"/>
</template>

<script>
import TrusteeForm from "@/components/trustee/form.vue";
import TrusteeCard from "@/components/trustee/card.vue";

export default {
  name: "Trustee",
  props: {
    model: {
      required: true,
      type: String
    },
    id: {
      required: true,
      type: String
    },
    trustee: {
      required: true,
      type: Object
    },
    isInEditMode: {
      required: true,
      type: Boolean
    }
  },
  components: {
    TrusteeForm,
    TrusteeCard
  }
};
</script>
