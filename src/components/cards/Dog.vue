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
                    Trustee: {{ dog.trustee }}
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
  name: "DogCard",
  props: {
    dog: {
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
    },
    formatDate (val) {
      return new Date(val).toLocaleDateString("en-US");
    }
  },
  components: {
    Btn
  }
};
</script>
