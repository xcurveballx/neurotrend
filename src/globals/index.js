import Vue from "vue"

Vue.filter("formatDateRU", (val) => new Date(val).toLocaleDateString("ru-RU"));
Vue.filter("formatDateTimeRU", (val) => {
    let opts = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(val).toLocaleDateString("ru-RU", opts);
});
