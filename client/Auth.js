/** Wrapper for fetch */
function Auth() {
}

Auth.install = (Vue, options) => {
  console.log('auth install')

  let $data = new Vue({
    data () {
      if (document.location.href.match('localhost')) {
        return {"user":{"id":"1","first_name":"Djilano","last_name":"Smit","email":"admin","admin":"1"},"authenticated":true}
      }

      return {
        user: {},
        authenticated: false
      }
    },

    computed: {
      fullName () {
        if (Object.keys(this.user).length <= 0) {
          return ''
        }

        return `${this.user.first_name} ${this.user.last_name}`
      }
    },

    methods: {
      login (email, password) {
        return new Promise((resolve, reject) => {
          console.log('[$auth.login]', 'login')
          this.$fetch.postJson('/api/user/login', {email, password})
            .then(response => {
              if (!response.success) {
                console.error('[$auth.login]', response)
                this.user = {}
                this.authenticated = false
                return reject(response.error)
              }

              this.user = response.user
              // {
              //   token: response.token,
              //   email: response.email
              // }
              this.authenticated = true
              resolve(this.user)
            })
        })
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$auth', {
    get () { return $data }
  })
}

export default Auth
