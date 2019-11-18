<template>
    <div class="card">
        <header class="card-header">
            <p v-if="!id" class="card-header-title">
                Add a new {{ model }}:
            </p>
            <p v-else class="card-header-title">Edit {{ fio }}:</p>
        </header>
        <div class="card-content">
            <input-val label="Name" placeholder="e.g. John Smith" :condition="!!validationErrors.fio" v-model="fio" :msg="validationErrors.fio">
                <span class="icon is-small is-left">
                    <i class="fas fa-user-tie"></i>
                </span>
            </input-val>

            <current-image v-if="photo" :photo="photo"/>

            <file-input label="Photo" v-model="new_photo" />

            <date-time label="Date of birth" v-model="birth_time" :fields="{year: true, month: true, day: true}" :error="validationErrors.birth_time"/>
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
import InputVal from "@/components/InputWithValidation.vue";
import CurrentImage from "@/components/CurrentImage.vue";
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
        InputVal,
        CurrentImage
    }
};
</script>
