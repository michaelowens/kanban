import App from './App.js'
import routes from './Routes.js'
import VueFetch from './VueFetch.js'

Vue.use(VueFetch)
Vue.use(window.DragAndDropList)

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  router.app.$fetch.json('/api/installed')
    .then(installed => {
      if (!installed && to.path.indexOf('/setup') < 0) {
        return next('/setup')
      }

      next()
    })
})

// new Vue({
//   components: {App},
//   el: '#app',
//   template: '<App />'
// })

const app = new Vue({
  router,
  components: {App},
  template: '<App />'
}).$mount('#app')
