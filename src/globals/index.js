import Vue from "vue"

Vue.filter("formatDate", (val) => new Date(val).toLocaleDateString("en-US"));
Vue.filter("formatDateTime", (val) => {
    let opts = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(val).toLocaleDateString("en-US", opts);
});
