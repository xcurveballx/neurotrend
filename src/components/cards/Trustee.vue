<template>
<div class="card">
<template v-if="editMode">
<header class="card-header">
    <p v-if="id == undefined" class="card-header-title">
        Add a new {{ model }}:
    </p>
    <p v-else class="card-header-title">Edit {{ item.fio }}:</p>
</header>
<div class="card-content">
    <div class="field">
        <label class="label">Name:</label>
        <div class="control">
            <input class="input" type="text" placeholder="John Smith">
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
        <label class="label">Subject</label>
        <div class="control">
            <div class="select">
                <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                </select>
            </div>
        </div>
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
</template>
<template v-else>
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
        <btn @click.native="toggleEdit" class="is-success">Edit</btn>
    </p>
    <p class="card-footer-item">
        <btn class="is-danger">Delete</btn>
    </p>
</footer>
</template>
</div>
</template>

<script>
import Btn from "@/components/Button.vue";
//import EventBus from '@/bus';

export default {
  name: "TrusteeCard",
  data () {
    return {
      editMode: false
    }
  },
  computed: {
    item() {
      return this.trustee
    }
  },
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
      this.editMode = !this.editMode;
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
