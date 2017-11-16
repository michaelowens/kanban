import App from './App.js'

function VueFetch() {
  console.log('VueFetch')
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

new Vue({
  components: {App},
  el: '#app',
  template: '<App />'
})