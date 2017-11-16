import comp from '../comp.js'

export default comp({
  templateURL: '/client/view/setup.html',

  components: {},

  data: () => {
    return {
      installed: null,
      error: false
    }
  },

  methods: {
    install () {
      if (!this.installed) {
        this.$fetch.json('/api/setup_db').then(response => {
          if (response) {
            this.$router.push('/backlog')
          } else {
            this.error = true
          }
        })
      }
    }
  },

  created () {
    this.$fetch.json('/api/installed')
      .then(installed => this.installed = installed)
  }
})
