import comp from '../comp.js'
import Navbar from '../components/Navbar.js'
import Sidenav from '../components/Sidenav.js'

export default comp({
  templateURL: '/client/view/projects.html',

  components: {Navbar, Sidenav},

  data: () => {
    return {
      installed: null,
      projects: [
        {
          project_name: "Resourceful",
          project_description: `Using our own kanban tool to keep track of
          development progress on this kanban tool? :) The rest is just a bunch
          of text so we can see how much of this crap can fit into a project card
          and how it looks.`,
          project_milestones: 3,
          project_totalEstimates: "1d 6h",
        },
        {
          project_name: "JQtpl",
          project_description: `Creating a jQuery template engine to
          inject shizzle drizzle into pendoria, hacky hacky`,
          project_milestones: 1,
          project_totalEstimates: "7h",
        },
      ],
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
