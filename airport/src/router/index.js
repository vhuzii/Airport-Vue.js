import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import Crews from '@/components/Crews';
import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/signin',
      component: Layout,
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: SignIn,
        },
        {
          path: 'signup',
          name: 'signup',
          component: SignUp,
        },
        {
          path: 'Crews',
          name: 'crews',
          component: Crews,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (store.state.user.isLoggedIn) {
    if (to.name === 'signin' || to.name === 'signup') {
      next('/crews');
    } else {
      next();
    }
  } else if (to.name !== 'signin') {
    next('/signIn');
  } else {
    next();
  }
});


export default router;
