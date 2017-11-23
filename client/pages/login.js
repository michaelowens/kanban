import comp from '../comp.js'
import ProgressIndicator from '../components/ProgressIndicator.js'

export default comp({
  templateURL: '/client/view/login.html',

  components: {
    ProgressIndicator,
  },

  data: () => {
    return {
      error: false,
      errorFields: [],

      email: '',
      password: ''
    }
  },

  methods: {
    back () {
    },

    next () {
    },

    login () {
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
