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
      errorFields: [],

      settings: {
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
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
      this.errorFields = []

      if (this.activeStep === 1) {
        if (this.settings.companyName.trim() === '') {
          this.errorFields.push('companyName')
        }
      }

      if (this.activeStep === 2) {
        if (this.settings.firstName.trim() === '') {
          this.errorFields.push('firstName')
        }

        if (this.settings.lastName.trim() === '') {
          this.errorFields.push('lastName')
        }
      }

      if (this.activeStep === 3) {
        if (this.settings.email.trim() === '') {
          this.errorFields.push('email')
        }

        if (this.settings.password === '') {
          this.errorFields.push('password')
        }

        if (this.settings.passwordRepeat === '') {
          this.errorFields.push('passwordRepeat')
        }

        if (this.settings.password !== this.settings.passwordRepeat) {
          this.errorFields.push('password', 'passwordRepeat')
        }
      }

      if (this.errorFields.length < 1 && this.activeStep <= this.steps) {
        this.activeStep += 1

        if (this.activeStep === this.steps + 1) {
          this.install()
        }
      }
    },

    install () {
      this.$fetch.json('/api/setup_db').then(response => {
        if (response) {
          //this.$router.push('/backlog')
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
