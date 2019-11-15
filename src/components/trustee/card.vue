<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ trustee.fio }}
            </p>
        </header>
        <div v-if="trustee.photo" class="card-image">
            <figure class="image">
                <img :src="trustee.photo" :alt="trustee.fio">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <ul>
                    <li>
                        Birthday: {{ trustee.birth_time | formatDateRU }}
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
  name: "TrusteeCard",
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
    }
  },
  methods: {
    toggleEdit () {
      EventBus.$emit('TOGGLE_EDIT_MODE');
    }
  },
  components: {
    Btn
  }
};
</script>
