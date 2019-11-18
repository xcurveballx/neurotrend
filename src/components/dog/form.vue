<template>
    <div class="card">
        <header class="card-header">
            <p v-if="!id" class="card-header-title">
                Add a new {{ model }}:
            </p>
            <p v-else class="card-header-title">Edit {{ name }}:</p>
        </header>
        <div class="card-content">
            <div class="field">
                <label class="label">Name:</label>
                <div class="control has-icons-right">
                    <input class="input" :class="{'is-danger': validationErrors.name}" type="text" placeholder="Buddy" v-model="name">
                    <span v-if="validationErrors.name" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-if="validationErrors.name">
                    {{ String(validationErrors.name) }}
                </input-val-mess>
            </div>
            <div class="field">
                <label class="label">Kind:</label>
                <div class="control has-icons-right">
                    <input class="input" :class="{'is-danger': validationErrors.kind}" type="text" placeholder="Shepherd" v-model="kind">
                    <span v-if="validationErrors.kind" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-if="validationErrors.kind">
                    {{ String(validationErrors.kind) }}
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
            <div class="field">
                <label class="label">Trustee:</label>
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
    name: "DogForm",
    data() {
        return {
            name: this.dog && this.dog.name || '',
            kind: this.dog && this.dog.kind || '',
            photo: this.dog && this.dog.photo || '',
            birth_time: this.dog && new Date(this.dog.birth_time) || new Date(0),
            trustee: this.dog && this.dog.trustee && this.dog.trustee.id || 0,
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
        dog: {
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
            if (this.name) formData.append("name", this.name);
            if (this.kind) formData.append("kind", this.kind);
            if (this.trustee) formData.append("trustee", this.trustee);
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
