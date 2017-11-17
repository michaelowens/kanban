import comp from '../comp.js'
import Navbar from '../components/Navbar.js'
import Sidenav from '../components/Sidenav.js'
import Card from '../components/Card.js'

export default comp({
  templateURL: '/client/view/backlog.html',

  components: {Navbar, Sidenav, Card},

  data: () => {
    return {
      how: 'dynamically',
      installed: null,
      projects: [],
      "lists": {
        "A": [
          {
            "id": 1,
            "label": "Item A1"
          },
          {
            "id": 2,
            "label": "Item A2"
          },
          //...
        ],
        "B": [
          {
            "id": 3,
            "label": "Item Marcel1"
          },
          //...
        ],
        "C": [
          //...
        ],
        "D": [
          //...
        ]
      }
    }
  },

  created () {
    this.$fetch.json('/api/installed')
      .then(installed => {
        this.installed = installed
        if (!installed) {
          this.$router.push('/setup')
        }
      })
    this.$fetch.json('/api/projects')
      .then(projects => this.projects = projects)
  }
})
