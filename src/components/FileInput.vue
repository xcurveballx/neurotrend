<template>
    <div class="control">
        <div class="file">
            <label class="file-label">
                <input @change="addPhoto($event)" class="file-input" type="file">
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
</template>

<script>
export default {
  name: "FileInput",
  props: {
    value: {
      required: true,
      type: [File, String]
    }
  },
  methods: {
    addPhoto(event) {
      let input = event.target,
          image = input.files.length ? input.files[0] : '',
          name = image.name,
          size = (image.size / 1000).toFixed(1),
          description = image && `${name}, (${size} Кб)`;

      input.nextElementSibling.lastElementChild.innerText = !image ? 'Choose an image' : description;

      this.$emit('input', image);
    }
  }
};
</script>
