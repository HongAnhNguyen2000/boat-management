// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/list",
        name: "List",
        component: () => import("@/views/List.vue"),
      },
      {
        path: "/form",
        name: "Business form",
        component: () => import("@/views/BusinessForm.vue"),
      },
      {
        path: "/form/:formID",
        name: "Business form Detail",
        component: () => import("@/views/BusinessForm.vue"),
      },
      {
        path: "/add-vehicle",
        name: "AddVehicle",
        component: () => import("@/views/addVehicle.vue"),
      },
      {
        path: "/update-user",
        name: "UpdateUser",
        component: () => import("@/views/UpdateUser.vue"),
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("@/views/users/Users.vue"),
      },
      {
        path: "/user/:userID",
        name: "User",
        component: () => import("@/views/users/User.vue"),
      },
      {
        path: "/user/update/:userID",
        name: "User Update",
        component: () => import("@/views/users/UserUpdate.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
