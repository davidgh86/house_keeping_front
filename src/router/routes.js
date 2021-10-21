
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/StatusPage.vue') },
      { path: 'status', component: () => import('src/pages/StatusPage.vue') },
      { path: 'team', component: () => import('pages/CleaningManager.vue') },
      { path: 'arrivals', component: () => import('src/pages/Arrivals.vue') },
      { path: 'apartments', component: () => import('src/pages/Apartments.vue') },
      { path: 'users', component: () => import('src/pages/Users.vue') },
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('pages/login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
