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
                    Birthday: {{ trustee.birth_time | formatDate }}
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
  name: "TrusteeCard",
  props: {
    trustee: {
      required: true,
      type: Object
    }
  },
  filters: {
    formatDate (val) {
      return new Date(val).toLocaleDateString("en-US");
    }
  },
  components: {
    Btn
  }
};
</script>
