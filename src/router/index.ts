import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Start from "@/views/Start.vue";
import Game from "@/views/Game.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/start",
    name: "Start",
    component: Start,
    props: true,
  },
  {
    path: "/",
    name: "Game",
    component: Game,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
