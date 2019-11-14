import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Items from "../views/Items.vue";
import AddForm from "../views/AddForm.vue";
import Item from "../views/Item.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
        children: [
            {
                path: "home",
                name: "home",
                component: Home,
            },
            {
                path: ":model",
                name: "model",
                component: Items,
                props: true,
                children: [
                    {
                        path: "add",
                        name: "add",
                        component: AddForm,
                        props: true
                    },
                    {
                        path: ":id",
                        name: "item",
                        component: Item,
                        props: true
                    }
                ]
            }
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    linkActiveClass: "is-active",
    base: process.env.BASE_URL,
    routes
});

export default router;
