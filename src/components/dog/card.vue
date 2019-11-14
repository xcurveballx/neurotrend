<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ dog.name }}
            </p>
        </header>
        <div v-if="dog.photo" class="card-image">
            <figure class="image">
                <img :src="dog.photo" :alt="dog.name">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <ul>
                    <li>
                        Birthday: {{ dog.birth_time | formatDate }}
                    </li>
                    <li>
                        Kind: {{ dog.kind }}
                    </li>
                    <li>
                        Registered: {{ dog.reg_time | formatDateTime }}
                    </li>
                    <li>
                        Trustee: {{ dog.trustee.fio }}
                    </li>
                </ul>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <btn @click.native="toggleEdit" class="is-success">Edit</btn>
            </p>
            <p class="card-footer-item">
                <btn class="is-danger">Delete</btn>
            </p>
        </footer>
    </div>
</template>

<script>
import Btn from "@/components/Button.vue";
import EventBus from '@/bus';

export default {
  name: "DogCard",
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
    }
  },
  methods: {
    toggleEdit () {
      EventBus.$emit('TOGGLE_EDIT_MODE');
    }
  },
  filters: {
    formatDate: (val) => new Date(val).toLocaleDateString("en-US"),
    formatDateTime (val) {
      let opts = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      return new Date(val).toLocaleDateString("en-US", opts);
    },
  },
  components: {
    Btn
  }
};
</script>
