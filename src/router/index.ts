// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import( '@/views/Login.vue'),
      },
      {
        path: '/list',
        name: 'List',
        component: () => import( '@/views/List.vue'),
      },
      {
        path: '/form',
        name: 'Business form',
        component: () => import( '@/views/BusinessForm.vue'),
      },
      {
        path: '/add-vehicle',
        name: 'AddVehicle',
        component: () => import( '@/views/addVehicle.vue'),
      },
      
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
