import comp from '../comp.js'
import ProgressIndicator from '../components/ProgressIndicator.js'

export default comp({
  templateURL: '/client/view/login.html',

  components: {
    ProgressIndicator,
  },

  data: () => {
    return {
      error: null,
      errorFields: [],

      email: '',
      password: '',

      redirecting: false
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$auth.authenticated) {
        vm.$router.push('/backlog')
        return
      }
    })
  },

  methods: {
    login () {
      this.error = null
      this.errorFields = []

      if (!this.email || !this.password) {
        if (!this.email) {
          this.errorFields.push('email')
        }

        if (!this.password) {
          this.errorFields.push('password')
        }

        return
      }

      this.$auth.login(this.email, this.password)
        .then(user => {
          console.log('Logged in as', this.$auth.fullName)
          this.redirecting = true
          setTimeout(() => this.$router.push('/backlog'), 500) // wait for fade
        })
        .catch(error => this.error = error)
      // this.$refs.liftoff.classList.add('liftoff');
      // setTimeout(() => this.redirecting = true, 500);
      // setTimeout(() => this.$router.push('/'), 1550);
    },

    // install () {
    //   this.$fetch.postJson('/api/setup', this.settings).then(response => {
    //     if (response) {
    //       //this.$router.push('/backlog')
    //       this.installed = true
    //     } else {
    //       this.error = true
    //     }
    //   })
    // },

    // onStepClicked (stepNumber) {
    //   console.log('I want to go to:', stepNumber)
    // }
  },

  created () {
    // this.$fetch.json('/api/installed')
    //   .then(installed => this.installed = installed)
  }
})
