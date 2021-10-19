import Vue from "vue";
import VueRouter from "vue-router";
import { adminRoot } from "./constants/config";

Vue.use(VueRouter);

const isAuthenticated = () => {
  return localStorage.getItem('bridgeAfrica-user') !== null && localStorage.getItem('bridgeAfrica-user').length > 0
}

const routes = [
  {
    path: '/',
    redirect: '/dashboards',
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    children: [
      {
        meta: { requiresAuth: true },
        path: "dashboards",
        name: '/dashboards',
        component: () => import(/* webpackChunkName: "dashboards" */ "./views/app/dashboards/Ecommerce"),
      }, {
        meta: { requiresAuth: true },
        path: "product",
        name: '/product',
        component: () => import(/* webpackChunkName : "product" */ "./views/app/pages/product/DataList"),
      }
    ]
  }, {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }, {
    path: "/unauthorized",
    component: () => import(/* webpackChunkName: "error" */ "./views/Unauthorized")
  }, {
    path: "/user",
    name: "Login",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () => import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () => import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () => import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () => import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  }, {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('bridgeAfrica-user') !== null && localStorage.getItem('bridgeAfrica-user').length > 0) {
      next()
    } else {
      next({ name: "Login" })
    }
  } else {
    next()
  }
})
export default router;
