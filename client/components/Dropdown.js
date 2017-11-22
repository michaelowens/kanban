import comp from '../comp.js'
import Tooltip from '../components/Tooltip.js'

export default comp({
  templateURL: '/client/components/Dropdown.html',
  components: {Tooltip},

  props: ['items'],

  data () {
    return {
      showDropdown: false,
      tooltipVisible: false,
      tooltipOptions: [
        {
          label: 'Yes',
          classNames: ['primary'],
          onClick: this.tooltipOnYes
        },
        {
          label: 'No',
          classNames: ['secondary'],
          onClick: this.tooltipOnNo
        }
      ]
    }
  },

  methods: {
    showTooltip () {
      this.tooltipVisible = true
    },

    hideTooltip () {
      this.tooltipVisible = false
    },

    toggleTooltip () {
      this.tooltipVisible = !this.tooltipVisible
    },

    tooltipOnYes () {
      this.showDropdown = !this.showDropdown
      this.tooltipVisible = !this.tooltipVisible
      console.log('Task has been deleted')
    },

    tooltipOnNo () {
      this.tooltipVisible = !this.tooltipVisible
      console.log('Task deletion aborted')
    }
  }
})
