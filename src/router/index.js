import Vue from "vue";
import VueRouter from "vue-router";
import Light from '../components/Light.vue';
Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: '/red',
    name: 'red',
    component: Light
  },
  {
    path: '/yellow',
    name: 'yellow',
    component: Light
  },
  {
    path: '/green',
    name: 'green',
    component: Light
  }
  
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
