<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                For {{ payment.purpose }}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <ul>
                    <li>
                        Sum: {{ `$${payment.sum}` }}
                    </li>
                    <li>
                        Time: {{ payment.time | formatDateTimeRU }}
                    </li>
                    <li>
                        Trustee: {{ payment.trustee.fio }}
                    </li>
                    <li>
                        Dog: {{ payment.dog.name }}
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
  name: "PaymentCard",
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
