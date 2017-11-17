import routes from './Routes.js'
import VueFetch from './VueFetch.js'

Vue.use(VueFetch)
Vue.use(window.DragAndDropList)

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: 'history'
})

// new Vue({
//   components: {App},
//   el: '#app',
//   template: '<App />'
// })

const app = new Vue({
  router
}).$mount('#app')