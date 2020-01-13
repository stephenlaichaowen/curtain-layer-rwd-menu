const routes = [
  {
    path: '/',
    name: 'home',
    component: httpVueLoader('../pages/home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: httpVueLoader('../pages/about.vue')
  },
  {
    path: '/services',
    name: 'services',
    component: httpVueLoader('../pages/services.vue')
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: httpVueLoader('../pages/portfolio.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: httpVueLoader('../pages/contact.vue')
  }
]

const router = new VueRouter({
  routes
})

