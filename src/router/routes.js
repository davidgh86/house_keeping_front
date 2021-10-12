
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Apartments.vue') },
      { path: 'apartments', component: () => import('pages/Apartments.vue') },
      { path: 'team', component: () => import('pages/CleaningManager.vue') },
      { path: 'admin', component: () => import('pages/Admin.vue') }
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
