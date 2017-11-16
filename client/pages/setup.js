import comp from '../comp.js'

export default comp({
  templateURL: '/client/view/setup.html',

  components: {},

  data: () => {
    return {
      installed: null,
    }
  },

  created () {
    this.$fetch.json('/api/installed')
      .then(installed => this.installed = installed)
  }
})
