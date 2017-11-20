import comp from '../comp.js'
import ProgressIndicator from '../components/ProgressIndicator.js'

export default comp({
  templateURL: '/client/view/setup.html',

  components: {
    ProgressIndicator,
  },

  data: () => {
    return {
      installed: null,
      error: false,

      settings: {
        companyName: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordRepeat: ''
      },

      steps: 3,
      activeStep: 1
    }
  },

  methods: {
    back () {
      if (this.activeStep > 1) {
        this.activeStep -= 1
      }
    },

    next () {
      if (this.activeStep <= this.steps) {
        this.activeStep += 1
      }
    },

    install () {
      this.$fetch.json('/api/setup_db').then(response => {
        if (response) {
          this.$router.push('/backlog')
        } else {
          this.error = true
        }
      })
    },
    onStepClicked (stepNumber) {
      console.log('I want to go to:', stepNumber)      
    }
  },

  created () {
    // this.$fetch.json('/api/installed')
    //   .then(installed => this.installed = installed)
  }
})
