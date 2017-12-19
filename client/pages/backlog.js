import comp from '../comp.js'
import Card from '../components/Card.js'

export default comp({
  templateURL: '/client/view/backlog.html',

  components: {Card},

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
        ],
        "B": [
          {
            "id": 3,
            "label": "Item Marcel1"
          },
          //...
        ],
        "C": [
          {
            "id": 4,
            "label": "Djilano swekkin"
          },
        ]
      }
    }
  },

  methods: {
    removeCard (card) {
      Object.keys(this.lists).forEach(listName => {
        this.lists[listName] = this.lists[listName].filter((listCard) => listCard.id != card.id)
      })
    }
  },

  created () {
    // this.$fetch.json('/api/installed')
    //   .then(installed => {
    //     this.installed = installed
    //     if (!installed) {
    //       this.$router.push('/setup')
    //     }
    //   })
    // this.$fetch.json('/api/project/list')
    //   .then(projects => this.projects = projects)
  }
})
