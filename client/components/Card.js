import comp from '../comp.js'
import Dropdown from '../components/Dropdown.js'

export default comp({
  templateURL: '/client/components/Card.html',
  components: {Dropdown},

  props: {
    data: Object
  },

  data () {
    return {
      dropdownItems: {
        'Edit': this.dropdownOnEdit,
        'Delete': this.dropdownOnDelete
      }
    }
  },

  methods: {
    dropdownOnEdit () {
      console.log('edit this card!', this.data)
    },

    dropdownOnDelete () {
      this.$refs.dropdown.showTooltip()
      console.log('delete this card!', this.data.id)
    },

    tooltipOnYes () {
      console.log('deleting', this.data)
      this.$emit('remove', this.data)
    },

    tooltipOnNo () {
      console.log('not deleting', this.data)
    }
  }
})
