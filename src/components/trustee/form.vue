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
                <div class="control">
                    <input class="input" type="text" placeholder="John Smith" v-model="fio">
                </div>
            </div>
            <div v-if="photo" class="field">
                <label class="label">Current image:</label>
                <div class="control">
                    <input disabled class="input" type="text" :value="photo">
                </div>
            </div>
            <div class="field">
                <label class="label">Image:</label>
                <div class="control">
                    <div class="file">
                        <label class="file-label">
                            <input class="file-input" type="file" name="image">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose an image
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Date of birth:</label>
                <date-time v-model="birth_time" :fields="{year: true, month: true, day: true}"/>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <btn class="is-link">Save changes</btn>
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
import EventBus from '@/bus';

export default {
  name: "TrusteeForm",
  data() {
    return {
      fio: this.trustee && this.trustee.fio || '',
      photo: this.trustee && this.trustee.photo || '',
      birth_time: this.trustee && new Date(this.trustee.birth_time),
      // .toISOString()
    }
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
      if (this.id)
        EventBus.$emit('TOGGLE_EDIT_MODE');
      else
        this.$router.push(`/${this.model}/`);
    },
  },
  components: {
    Btn,
    DateTime
  }
};
</script>
