import Vue from "vue"

// filters
Vue.filter("formatDateRU", (val) => new Date(val).toLocaleDateString("ru-RU"));

Vue.filter("plural", (val) => `${val}s`);

Vue.filter("uppercase", (val) => `${val.charAt(0).toUpperCase()}${val.slice(1)}`);

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
