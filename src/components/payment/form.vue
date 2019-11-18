<template>
    <div class="card">
        <header class="card-header">
            <p v-if="!id" class="card-header-title">
                Add a new {{ model }}:
            </p>
            <p v-else class="card-header-title">Edit payment #{{ id }}:</p>
        </header>
        <div class="card-content">
            <div class="field">
                <label class="label">Purpose:</label>
                <div class="control has-icons-right">
                    <input class="input" :class="{'is-danger': validationErrors.purpose}" type="text" placeholder="Food" v-model="purpose">
                    <span v-if="validationErrors.purpose" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-if="validationErrors.purpose">
                    {{ String(validationErrors.purpose) }}
                </input-val-mess>
            </div>
            <div class="field">
                <label class="label">Sum:</label>
                <div class="control has-icons-right">
                    <input class="input" :class="{'is-danger': validationErrors.sum}" type="text" placeholder="1000" v-model="sum">
                    <span v-if="validationErrors.sum" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-if="validationErrors.sum">
                    {{ String(validationErrors.sum) }}
                </input-val-mess>
            </div>
            <div class="field">
                <label class="label">Time:</label>
                <date-time v-model="time" :fields="{year: true, month: true, day: true, hours: true, minutes: true}" :error="validationErrors.time"/>
            </div>
            <div class="field">
                <label class="label">From trustee:</label>
                <div class="control">
                    <div class="select">
                        <select v-model="trustee">
                            <optgroup label="trustees">
                                <option v-for="item in $store.getters['trustee/trustee']" :value="item.id" :key="item.id">
                                    {{ item.fio }}
                                </option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">For dog:</label>
                <div class="control">
                    <div class="select">
                        <select v-model="dog">
                            <optgroup label="dogs">
                                <option v-for="item in $store.getters['dog/dog']" :value="item.id" :key="item.id">
                                    {{ item.name }}
                                </option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            </div>
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
import InputValMess from "@/components/InputValidationMessage.vue";
import { mapGetters } from 'vuex';
import EventBus from '@/bus';

export default {
    name: "PaymentForm",
    data() {
        return {
            purpose: this.payment && this.payment.purpose || '',
            sum: this.payment && this.payment.sum || 0,
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
        InputValMess
    }
};
</script>
