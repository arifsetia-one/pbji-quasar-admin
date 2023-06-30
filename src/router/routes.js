import auth from "src/middlewares/auth.middleware";
import guest from "src/middlewares/guest.middleware";

const routes = [
  {
    path: "/auth",
    meta: {
      middleware: guest,
    },
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "Login Page",
        component: () => import("pages/auth/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: {
      middleware: auth,
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard Page",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/presensi",
        children: [
          {
            path: "",
            name: "Presensi Page",
            component: () => import("pages/presensi/IndexPage.vue"),
          },
        ],
      },
      {
        path: "/tambah-atlet",
        children: [
          {
            path: "",
            name: "Tambah Atlet Page",
            component: () => import("pages/add_atlet/IndexPage.vue"),
          },
        ],
      },
      {
        path: "/profile",
        children: [
          {
            path: "",
            name: "My Profile Page",
            component: () => import("pages/main/adminProfile/IndexPage.vue"),
          },
          // { path: 'edit', name: 'My Profile Edit Page', component: () => import('pages/main/adminProfile/EditPage.vue') }
        ],
      },
      {
        path: "/account",
        name: "My Account Page",
        component: () => import("pages/main/adminAccount/IndexPage.vue"),
      },
      {
        path: "/settings",
        children: [
          {
            path: "",
            name: "Setting Page",
            component: () => import("pages/main/settings/IndexPage.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

// const routes = [
//   {
//     path: '/auth',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') }
//     ]
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes
