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
        path: "/user",
        children: [
          {
            path: "",
            name: "User List Page",
            component: () => import("pages/main/user/IndexPage.vue"),
          },
          {
            path: "create",
            name: "User Create Page",
            component: () => import("pages/main/user/CreatePage.vue"),
          },
          {
            path: "edit/:id",
            name: "User Edit Page",
            component: () => import("pages/main/user/EditPage.vue"),
          },
        ],
      },
      {
        path: "/content",
        children: [
          {
            path: "",
            name: "Content List Page",
            component: () => import("pages/main/content/IndexPage.vue"),
          },
          {
            path: "create",
            name: "Content Create Page",
            component: () => import("pages/main/content/CreatePage.vue"),
          },
        ],
      },
      {
        path: "/content-category",
        children: [
          {
            path: "",
            name: "Content Category List Page",
            component: () =>
              import("pages/main/content-category/IndexPage.vue"),
          },
          {
            path: "create",
            name: "Content Category Create Page",
            component: () =>
              import("pages/main/content-category/CreatePage.vue"),
          },
          {
            path: "create-2",
            name: "Content Category Create Page 2",
            component: () =>
              import("pages/main/content-category/CreatePage2.vue"),
          },
          {
            path: "edit/:id",
            name: "Content Category Edit Page",
            component: () => import("pages/main/content-category/EditPage.vue"),
          },
        ],
      },
      {
        path: "/event",
        children: [
          {
            path: "",
            name: "Event List Page",
            component: () => import("pages/main/event/IndexPage.vue"),
          },
          {
            path: "create",
            name: "Event Create Page",
            component: () => import("pages/main/event/CreatePage.vue"),
          },
          {
            path: "participant",
            name: "Participant Detail Page",
            component: () => import("pages/main/event/ParticipantPage.vue"),
          },
        ],
      },
      {
        path: "/event-category",
        children: [
          {
            path: "",
            name: "Event Category List Page",
            component: () => import("pages/main/event-category/IndexPage.vue"),
          },
          {
            path: "create",
            name: "Event Category Create Page",
            component: () => import("pages/main/event-category/CreatePage.vue"),
          },
          {
            path: "edit/:id",
            name: "Event Category Edit Page",
            component: () => import("pages/main/event-category/EditPage.vue"),
          },
        ],
      },
      {
        path: "/form",
        children: [
          {
            path: "",
            name: "Form List Page",
            component: () => import("pages/main/form/IndexPage.vue"),
          },
          {
            path: "create",
            name: "Form Create Page",
            component: () => import("pages/main/form/CreatePage.vue"),
          },
          {
            path: "edit/:id",
            name: "Form Edit Page",
            component: () => import("pages/main/form/EditPage.vue"),
          },
        ],
      },
      {
        path: "/infaq",
        children: [
          {
            path: "",
            name: "Infaq List Page",
            component: () => import("pages/main/infaq/IndexPage.vue"),
          },
          {
            path: "detail",
            name: "Infaq Detail Page",
            component: () => import("pages/main/infaq/DetailPage.vue"),
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
