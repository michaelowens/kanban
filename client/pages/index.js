import comp from '../comp.js'

export default comp({
  created () {
    this.$router.push('/backlog') // no index right now, go straight to backlog
  },
})
