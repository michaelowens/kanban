import comp from '../comp.js'
import Navbar from '../components/Navbar.js'
import Sidenav from '../components/Sidenav.js'

export default comp({
  templateURL: '/client/view/projects.html',

  components: {Navbar, Sidenav},

  data: () => {
    return {
      installed: null,
      projects: [],
      showAddProject: false,
      newProject: {
        name: ''
      }
    }
  },

  methods: {
    openAddProject (e) {
      e.preventDefault()
      this.showAddProject = true
    },

    addProject (e) {
      e.preventDefault()

      this.$fetch.postJson('/api/project/add', this.newProject)
        .then(response => {
          console.log('addProject: added!', response)
          this.newProject.name = ''
          this.showAddProject = false

          this.getProjects()
        })
        .catch(response => {
          console.log('addProject: error!', response)
        })
    },

    getProjects () {
      this.$fetch.json('/api/project/list')
        .then(projects => this.projects = projects)
    }
  },

  created () {
    this.getProjects()
  }
})
