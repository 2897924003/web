import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    name: "login",
    meta: { requireAuthenticated: false },
  },

  {
    path: "/mainlayout",
    name: "mainlayout",
    component: MainLayout,
    children: [
      {
        path: "/indexpage",
        component: () => import("pages/IndexPage.vue"),
      },

      {
        path: "/targetpage",
        component: () => import("pages/TargetPage.vue"),
      },

      {
        path: "/userauthpage",
        meta: { requireAuthenticated: true },
        component: () => import("pages/UserAuthPage.vue"),
      },
      {
        path: "/studentinfopage",
        meta: { requireAuthenticated: false },
        component: () => import("pages/StudentInfoPage.vue"),
      },
    ],
  },

  /*{
  path: "/class",
  name: "/class",

  children:[
    {
      path: "studentinfopage",
      meta: { requireAuthenticated: false },
      component: () => import("pages/StudentInfoPage.vue"),
    },
  ]
  }
  ,*/
  {
    path: "/building",
    name: "building",
    component: () => import("layouts/BuildingLayout.vue"),
    children: [
      {
        path: "/examplepage",
        component: () => import("pages/BuildingExample.vue"),
      },
    ],
  },
  {
    path: "/Oauth2WaitingPage",
    component: () => import("pages/Oauth2WaitingPage.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/login",
    redirect: "/",
  },
];

export default routes;
