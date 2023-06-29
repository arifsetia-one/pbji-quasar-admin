import { useMeta } from 'quasar'
import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import middlewarePipeline from './middleware-pipeline'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // Add a navigation guard that executes before any navigation.
  Router.beforeEach((to, from, next) => {
    // use quasar meta
    useMeta({
      // sets document title
      title: to.meta.title,
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title) => `${title} - pbji`
    })

    // run the middleware(s)
    if (!to.meta.middleware) return next()
    const middlewares = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]
    const context = { to, from, next }
    return middlewares[0]({
      ...context,
      next: middlewarePipeline(context, middlewares, 1)
    })
  })

  return Router
})




// import { route } from 'quasar/wrappers'
// import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
// import routes from './routes'

// /*
//  * If not building with SSR mode, you can
//  * directly export the Router instantiation;
//  *
//  * The function below can be async too; either use
//  * async/await or return a Promise which resolves
//  * with the Router instance.
//  */

// export default route(function (/* { store, ssrContext } */) {
//   const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

//   const Router = createRouter({
//     scrollBehavior: () => ({ left: 0, top: 0 }),
//     routes,

//     // Leave this as is and make changes in quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     history: createHistory(process.env.VUE_ROUTER_BASE)
//   })

//   return Router
// })
