import MainLayout from "layouts/MainLayout.vue";
import ArticleDetailPage from "pages/article_management/ArticleDetailPage.vue";
import CodeRunner from "pages/CodeRunner.vue";

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
    redirect: "/home",
    children: [
      {
        path: "/indexpage",
        component: () => import("pages/IndexPage.vue"),
      },

      {
        path: "/home",
        component: () => import("pages/NavigationPage.vue"),
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
  {
    path: "/admin",
    component: () => import("layouts/UserCenter.vue"),
    meta: { requireAuthenticated: true },
    children: [
      {
        path: "/profile",
        meta: { requireAuthenticated: false },
        component: () => import("pages/UserInfo.vue"),
      },
      {
        path: "/security",
        meta: { requireAuthenticated: false },
        component: () => import("pages/user_management/AccountSecurity.vue"),
      },
      {
        path: "/users",
        meta: { requireAuthenticated: false },
        component: () => import("pages/UserManage.vue"),
      },

    ]
  },
  {
    path: "/discuss",
    component: () => import("layouts/DiscussionCenter.vue"),
    meta: { requireAuthenticated: false },
    redirect: '/discuss/home',
    children: [
      {
        path: "home",
        meta: { requireAuthenticated: false },
        component: () => import("pages/DiscussionHome.vue"),
      },
      {
        path: 'article/:article_id',
        name: 'ArticleDetail',
        component: ArticleDetailPage
      },
      {
        path: "code",
        name: 'CodeRunner',
        component: () => import("pages/CodeRunner.vue"),
      },
      {
        path: "article",
        name: "ArticleManagement",
        meta: { requireAuthenticated: false },
        component: () => import("pages/article_management/ArticleManagement.vue"),
        children:[
          {
            path:'draft',
            meta: { requireAuthenticated: true },
            component:()=>import("pages/article_management/DraftPage.vue"),
          }
        ]
      },
      {
        path: "user",
        component: () => import("pages/user_management/UserManagement.vue"),
      },
    ]
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
