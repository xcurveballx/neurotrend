<template>
    <dog-form v-if="isInEditMode" :dog="dog" :model="model" :id="id" />
    <dog-card v-else :dog="dog" :model="model" :id="id"/>
</template>

<script>
import DogForm from "@/components/dog/form.vue";
import DogCard from "@/components/dog/card.vue";

export default {
    name: "Dog",
    props: {
        model: {
            required: true,
            type: String
        },
        id: {
            required: true,
            type: String
        },
        dog: {
            required: true,
            type: Object
        },
        isInEditMode: {
            required: true,
            type: Boolean
        }
    },
    components: {
        DogForm,
        DogCard
    }
};
</script>
