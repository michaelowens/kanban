/** Wrapper for fetch */
function Auth() {
}

Auth.install = (Vue, options) => {
  console.log('auth install')

  let $data = new Vue({
    data () {
      return {
        user: {},
        authenticated: false
      }
    },

    methods: {
      login () {
        this.user = {
          name: 'Michael'
        }
        this.authenticated = true
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$auth', {
    get () { return $data }
  })
}

export default Auth
