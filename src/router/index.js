import { createRouter, createWebHashHistory } from 'vue-router'
import { isAuthenticated } from '../utils/account'

const router = createRouter({
  history: createWebHashHistory('/testing/academic_paper_award-mVgBO4y5dvkZ5slhGLjNbMgANP1ZxPDn/dist'),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/password',
      name: 'forget password',
      component: () => import('../views/ForgetPasswordView.vue')
    },
    {
      path: '/admin-portal',
      name: 'admin portal',
      component: () => import('../views/AdminPortalView.vue')
    },
    {
      path: '/alert-resetpassword',
      name: 'alert for reset password',
      component: () => import('../views/Alert/AlertPassword.vue')
    },
    {
      path: '/alert-admin-resetpassword/:email',
      name: 'AlertResetPassword',
      component: () => import('../views/Alert/AlertResetPassword.vue'),
    },
    {
      path: '/alert-patchgroup/:team/:type',
      name: 'AlertPatchGroup',
      component: () => import('../views/Alert/AlertPatchGroup.vue'),
    },
    {
      path: '/alert-fillexaminee/:team/:groupid',
      name: 'AlertFillExaminee',
      component: () => import('../views/Alert/AlertFillExaminee.vue'),
    },
    {
      path: '/alert-addexaminee/:team/:groupid/:index',
      name: 'AlertAddExaminee',
      component: () => import('../views/Alert/AlertAddExaminee.vue'),
    },
    {
      path: '/alert-patchexaminee/:team/:groupid/:id',
      name: 'AlertPatchExaminee',
      component: () => import('../views/Alert/AlertPatchExaminee.vue'),
    },
    {
      path: '/alert-admin-deleteaccount/:email',
      name: 'AlertDeleteAccount',
      component: () => import('../views/Alert/AlertDeleteAccount.vue'),
    },
    {
      path: '/alert-deletegroup/:group',
      name: 'AlertDeleteGroup',
      component: () => import('../views/Alert/AlertDeleteGroup.vue'),
    },
    {
      path: '/alert-deleteexaminee/:id/:team',
      name: 'AlertDeleteExaminee',
      component: () => import('../views/Alert/AlertDeleteExaminee.vue'),
    },
    {
      path: '/alert-admin-revisestudentaccount/:studentid',
      name: 'AlertReviseStudentAccount',
      component: () => import('../views/Alert/AlertReviseStudentAccount.vue'),
    },
    {
      path: '/alert-admin-reviseadvisor/:email',
      name: 'AlertReviseAdvisor',
      component: () => import('../views/Alert/AlertReviseAdvisor.vue'),
    },
    {
      path: '/alert-admin-addchange',
      name: 'AddChange',
      component: () => import('../views/Alert/AlertAddChange.vue'),
    },
    {
      path: '/alert-admin-addadvisor',
      name: 'AddAdvisor',
      component: () => import('../views/Alert/AlertAddAdvisor.vue'),
    },
    {
      path: '/admin-systemparameter',
      name: 'admin system parameter',
      component: () => import('../views/SystemParameter.vue')
    },
    {
      path: '/admin-studentgroup/:team',
      name: 'StudentGroup',
      component: () => import('../views/StudentGroup.vue')
    },
    {
      path: '/admin-accountmanage',
      name: 'AccountManage',
      component: () => import('../views/AccountManage.vue')
    },
    {
      path: '/admin-preferencemanage',
      name: 'PreferenceManage',
      component: () => import('../views/PreferenceManage.vue')
    },
    {
      path: '/admin-changemanage',
      name: 'ChangeManage',
      component: () => import('../views/ChangeManage.vue')
    },
    {
      path: '/student',
      name: 'UserStudent',
      component: () => import('../views/UserStudent.vue')
    },
    {
      path: '/advisor',
      name: 'UserAdvisor',
      component: () => import('../views/UserAdvisor.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path != '/login' && to.path != '/register') {
    if (await isAuthenticated()) next()
    else next({ path: '/login' })
  } else {
    next()
  }
})

export default router

