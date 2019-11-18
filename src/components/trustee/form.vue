<template>
    <div class="card">
        <header class="card-header">
            <p v-if="!id" class="card-header-title">
                Add a new {{ model }}:
            </p>
            <p v-else class="card-header-title">Edit {{ fio }}:</p>
        </header>
        <div class="card-content">
            <div class="field">
                <label class="label">Name:</label>
                <div class="control has-icons-right">
                    <input class="input" :class="{'is-danger': validationErrors.fio}" type="text" placeholder="John Smith" v-model="fio">
                    <span v-if="validationErrors.fio" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-if="validationErrors.fio">
                    {{ String(validationErrors.fio) }}
                </input-val-mess>
            </div>
            <div v-if="photo" class="field">
                <label class="label">Current image:</label>
                <div class="control">
                    <input disabled class="input" type="text" :value="photo">
                </div>
            </div>
            <div class="field">
                <label class="label">Photo:</label>
                <file-input v-model="new_photo" />
            </div>
            <div class="field">
                <label class="label">Date of birth:</label>
                <date-time v-model="birth_time" :fields="{year: true, month: true, day: true}" :error="validationErrors.birth_time"/>
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
import FileInput from "@/components/FileInput.vue";
import InputValMess from "@/components/InputValidationMessage.vue";
import { mapGetters } from 'vuex';
import EventBus from '@/bus';

export default {
    name: "TrusteeForm",
    data() {
        return {
            fio: this.trustee && this.trustee.fio || '',
            photo: this.trustee && this.trustee.photo || '',
            birth_time: this.trustee && new Date(this.trustee.birth_time) || new Date(0),
            new_photo: ''
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
        trustee: {
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
            if (this.fio) formData.append("fio", this.fio);
            if (this.birth_time) formData.append("birth_time", this.birth_time.toISOString());
            if (this.new_photo) formData.append("photo", this.new_photo, this.new_photo.name);

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
        FileInput,
        InputValMess
    }
};
</script>
