import comp from './comp.js'

export default comp({
  templateURL: '/client/view/index.html',

  created () {
    this.$fetch.json('/api/installed')
      .then(installed => {
        this.$router.push(installed ? '/backlog' : '/setup')
      })
  }
})
