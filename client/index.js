import App from './App.js'
import routes from './Routes.js'
import VueFetch from './VueFetch.js'
import Auth from './Auth.js'

Vue.use(Auth)
Vue.use(VueFetch)
Vue.use(window.DragAndDropList)

const router = new VueRouter({
  routes,
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

const app = new Vue({
  router,
  el: '#app',
  components: {App},
  template: '<App />'
})
