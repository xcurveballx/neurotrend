<template>
    <payment-form v-if="isInEditMode" :payment="payment" :model="model" :id="id" />
    <payment-card v-else :payment="payment" :model="model" :id="id"/>
</template>

<script>
import PaymentForm from "@/components/payment/form.vue";
import PaymentCard from "@/components/payment/card.vue";

export default {
    name: "Payment",
    props: {
        model: {
            required: true,
            type: String
        },
        id: {
            required: true,
            type: String
        },
        payment: {
            required: true,
            type: Object
        },
        isInEditMode: {
            required: true,
            type: Boolean
        }
    },
    components: {
        PaymentForm,
        PaymentCard
    }
};
</script>
