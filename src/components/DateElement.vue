<template>
    <div class="select">
        <select :value="value" @input="$emit('input', +$event.target.value)">
            <option value="-1">{{ name }}</option>
            <template v-if="['hours','minutes'].includes(name)">
                <option v-for="(elem, index) in elems" :key="index">
                    {{ index }}
                </option>
            </template>
            <template v-else>
                <option v-for="elem in elems" :key="elem">
                    {{ elem }}
                </option>
            </template>
        </select>
    </div>
</template>

<script>
export default {
  name: "DateElement",
  props: {
    elems: {
      required: true,
      type: [Array, Number]
    },
    name: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Number
    }
  },
};
</script>
