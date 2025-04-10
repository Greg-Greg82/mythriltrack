import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/LoginCard.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin)

  const proceed = async (user) => {
    if (requiresAdmin) {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.data()

      if (!userData || userData.role !== 'admin') {
        return next('/') // 🚫 Pas admin
      }
    }

    next()
  }

  if (!requiresAuth) return next()

  const currentUser = auth.currentUser
  if (currentUser) return proceed(currentUser)

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()
    if (user) {
      proceed(user)
    } else {
      next({ name: 'Login' })
    }
  })
})

export default router
