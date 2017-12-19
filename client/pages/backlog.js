import comp from '../comp.js'
import Card from '../components/Card.js'

export default comp({
  templateURL: '/client/view/backlog.html',

  components: {Card},

  data: () => {
    return {
      isBacklog: false, // Switching between backlog & board view as test
      how: 'dynamically',
      installed: null,
      projects: [],
      quickTaskTitles: {},

      backlog: [
        {
          "id": 1,
          "title": "Item A1",
          label: "Front-end",
        },
        {
          "id": 2,
          "title": "Item A2",
        },
      ],

      lists: {
        A: [
          {
            "id": 1,
            "title": "Item A1",
            label: "Front-end",
          },
          {
            "id": 2,
            "title": "Item A2",
          },
        ],
        B: [
          {
            "id": 3,
            "title": "Item Marcel1",
          },
        ],
        C: [
          {
            "id": 4,
            "title": "Djilano swekkin",
            label: "Front-end",
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
    },

    clearQuickTask (index) {
      this.quickTaskTitles[index] = ''
      this.$refs.quickTaskInputs[index].focus()
    },

    addQuickTask (index) {
      console.log("adding quicktask:", index, this.quickTaskTitles[index])
    }
  },
})
