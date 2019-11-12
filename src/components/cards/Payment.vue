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
                        Time: {{ payment.time | formatDateTime }}
                    </li>
                    <li>
                        Trustee: {{ payment.trustee }}
                    </li>
                    <li>
                        Dog: {{ payment.dog }}
                    </li>
                </ul>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <btn class="is-success">Edit</btn>
            </p>
            <p class="card-footer-item">
                <btn class="is-danger">Delete</btn>
            </p>
        </footer>
    </div>
</template>

<script>
import Btn from "@/components/Button.vue";

export default {
  name: "PaymentCard",
  props: {
    payment: {
      required: true,
      type: Object
    }
  },
  filters: {
    formatDateTime (val) {
      let opts = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      return new Date(val).toLocaleDateString("en-US", opts);
    }
  },
  components: {
    Btn
  }
};
</script>
