<template>
    <div class="control">
        <date-element v-if="fields.day" :value="day"
        @input="emit($event, 'day')" name="day" :elems="31"/>/&nbsp;

        <date-element v-if="fields.month" :value="month"
        @input="emit($event, 'month')" name="month" :elems="12"/>/&nbsp;

        <date-element v-if="fields.year" :value="year"
        @input="emit($event, 'year')" name="year" :elems="years(1900)"/><br/>

        <date-element v-if="fields.hours" :value="hours"
        @input="emit($event, 'hours')" name="hours" :elems="24"/>

        <template v-if="fields.hours && fields.minutes">
            &nbsp;:&nbsp;
        </template>

        <date-element v-if="fields.minutes" :value="minutes"
        @input="emit($event, 'minutes')" name="minutes" :elems="60"/>&nbsp;
    </div>
</template>

<script>
import DateElement from "@/components/DateElement.vue";

export default {
  name: "DateTime",
  data () {
    return {
      hours: this.value.getHours(),
      minutes: this.value.getMinutes(),
      seconds: this.value.getSeconds(),
      day: this.value.getDate(),
      month: this.value.getMonth() + 1,
      year: this.value.getFullYear(),
    }
  },
  props: {
    value: {
      required: true,
      type: Date
    },
    fields: {
      required: true,
      type: Object
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
      this.$emit('input', new Date(this.year, this.month - 1, this.day, this.hours, this.minutes, this.seconds));
    }
  },
  components: {
    DateElement
  }
};
</script>
