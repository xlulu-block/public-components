import Vue from "vue";
import VueRouter from "vue-router";
import TableFather from "../views/TableFather.vue";
import FormFather from "../views/FormFather.vue";
import Test from "../views/Test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Test",
    component: Test,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
