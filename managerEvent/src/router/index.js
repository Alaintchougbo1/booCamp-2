import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CalendarView from '@/views/CalendarView.vue'
import EventList from '@/components/EventList.vue'
import EventForm from '@/components/EventForm.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: CalendarView },
    { path: '/events', component: EventList },
    { path: '/events/new', component: EventForm },
    { path: '/events/:id', component: EventForm, props: true }
]
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }


    
  
})

export default router
