import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import EventBus from '@/bus';
import "./globals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bulma/css/bulma.css';
import './assets/styles.css';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = EventBus;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
