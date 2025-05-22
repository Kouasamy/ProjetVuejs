import { createRouter, createWebHistory } from 'vue-router'
import Inscription from '@/views/Inscription.vue'
import Connexion from '@/views/Connexion.vue'
import Chat from '@/views/Chat.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'connexion',
      component: Connexion,  
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription, 
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat, 
    },
  ],
})

export default router
