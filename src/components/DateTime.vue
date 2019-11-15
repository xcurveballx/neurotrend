<template>
    <div class="control">
        <date-element :value="day" @input="emit($event, 'day')"
        name="day" :elems="31"/>&nbsp;

        <date-element :value="month" @input="emit($event, 'month')"
        name="month" :elems="12"/>&nbsp;

        <date-element :value="year" @input="emit($event, 'year')"
        name="year" :elems="years(1900)"/>
    </div>
</template>

<script>
import DateElement from "@/components/DateElement.vue";

export default {
  name: "DateOfBirth",
  data () {
    return {
      day: this.value.getDate(),
      month: this.value.getMonth() + 1,
      year: this.value.getFullYear(),
    }
  },
  props: {
    value: {
      required: true,
      type: Date
    }
  },
  methods: {
    years (y) {
      let years = [];
      for(let year = y; year <= (new Date).getFullYear(); year++)
          years.push(year);

      return years;
    },
    emit (val, lapse) {
      this[lapse] = val;
      this.$emit('input', new Date(this.year, this.month - 1, this.day));
    }
  },
  components: {
    DateElement
  }
};
</script>
