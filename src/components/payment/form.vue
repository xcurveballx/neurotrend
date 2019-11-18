<template>
    <div class="card">
        <header class="card-header">
            <p v-if="!id" class="card-header-title">
                Add a new {{ model }}:
            </p>
            <p v-else class="card-header-title">Edit payment #{{ id }}:</p>
        </header>
        <div class="card-content">
            <input-val label="Purpose" placeholder="e.g. Food" :condition="!!validationErrors.purpose" v-model="purpose" :msg="validationErrors.purpose">
                <span class="icon is-small is-left">
                    <i class="fas fa-hands-helping"></i>
                </span>
            </input-val>

            <input-val label="Sum" placeholder="e.g. 1000" :condition="!!validationErrors.sum" v-model="sum" :msg="validationErrors.sum">
                <span class="icon is-small is-left">
                    <i class="fas fa-dollar-sign"></i>
                </span>
            </input-val>

            <date-time label="Time" v-model="time" :fields="{year: true, month: true, day: true, hours: true, minutes: true}" :error="validationErrors.time"/>

            <select-list label="Trustee" fieldName="fio" v-model="trustee" :items="$store.getters['trustee/trustee']"/>

            <select-list label="Dog" fieldName="name" v-model="dog" :items="$store.getters['dog/dog']"/>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <btn @click.native="save" class="is-link">Save changes</btn>
            </p>
            <p class="card-footer-item">
                <btn @click.native="toggleEdit">Cancel</btn>
            </p>
        </footer>
    </div>
</template>

<script>
import Btn from "@/components/Button.vue";
import DateTime from "@/components/DateTime.vue";
import InputVal from "@/components/InputWithValidation.vue";
import SelectList from "@/components/SelectList.vue";
import { mapGetters } from 'vuex';
import EventBus from '@/bus';

export default {
    name: "PaymentForm",
    data() {
        return {
            purpose: this.payment && this.payment.purpose || '',
            sum: this.payment && this.payment.sum + '' || '0',
            time: this.payment && new Date(this.payment.time) || new Date(0),
            trustee: this.payment && this.payment.trustee && this.payment.trustee.id || 0,
            dog: this.payment && this.payment.dog && this.payment.dog.id || 0
        }
    },
    computed: {
        ...mapGetters(["validationErrors"])
    },
    props: {
        model: {
            required: true,
            type: String
        },
        id: {
            required: true,
            type: [String, Boolean]
        },
        payment: {
            required: true,
            type: [Object, Boolean]
        }
    },
    methods: {
        toggleEdit() {
            if (this.id) {
                EventBus.$emit('TOGGLE_EDIT_MODE');
                EventBus.$emit('CLEAR_VALIDATION_ERRORS');
            } else {
                this.$router.push(`/${this.model}/`);
            }
        },
        save() {
            let formData = new FormData();
            if (this.purpose) formData.append("purpose", this.purpose);
            if (this.sum) formData.append("sum", this.sum);
            if (this.trustee) formData.append("trustee", this.trustee);
            if (this.dog) formData.append("dog", this.dog);
            if (this.time) formData.append("time", this.time.toISOString());

            let payload = {};
            if (this.model) payload.model = this.model;
            if (this.id) payload.id = this.id;
            payload.data = formData;

            if (payload.id)
                EventBus.$emit('UPDATE_MODEL', payload);
            else
                EventBus.$emit('CREATE_MODEL', payload);
        }
    },
    components: {
        Btn,
        DateTime,
        InputVal,
        SelectList
    }
};
</script>
