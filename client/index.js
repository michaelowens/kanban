import routes from './Routes.js'

/** Wrapper for fetch */
function VueFetch() {
}

VueFetch.install = (Vue, options) => {
  Vue.prototype.$fetch = {
    json (url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(response => {
            resolve(response.json())
          })
      })
    }
  }
}

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