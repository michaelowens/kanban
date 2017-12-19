import comp from '../comp.js'
import Tooltip from './Tooltip.js'
import {hasParent} from '../utils.js'

export default comp({
  templateURL: '/client/components/Dropdown.html',
  components: {Tooltip},

  props: ['items'],

  data () {
    return {
      dropdownSelector: '.dropdown_wrapper',
      dropdownVisible: false,
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
    toggleDropdown () {
      this.dropdownVisible = !this.dropdownVisible
      if (this.dropdownVisible) {
        this.bindDocumentEvent()
      } else {
        this.unbindDocumentEvent()
      }
    },

    showDropdown () {
      if (this.dropdownVisible) {
        return
      }

      this.dropdownVisible = true
      this.bindDocumentEvent()
    },

    hideDropdown () {
      if (!this.dropdownVisible) {
        return
      }

      this.hideTooltip()

      this.dropdownVisible = false
      this.unbindDocumentEvent()
    },

    showTooltip () {
      this.tooltipVisible = true
    },

    hideTooltip () {
      this.tooltipVisible = false
    },

    bindDocumentEvent () {
      document.addEventListener('click', this.handleDocumentClick, true)
    },

    handleDocumentClick (e) {
      if (!hasParent(e.target, this.dropdownSelector)) {
        this.hideDropdown()
      }
    },

    unbindDocumentEvent () {
      document.removeEventListener('click', this.handleDocumentClick, true)
    },

    toggleTooltip () {
      this.tooltipVisible = !this.tooltipVisible
    },

    tooltipOnYes () {
      this.$emit('tooltip-yes')
      this.hideTooltip()
      this.hideDropdown()
    },

    tooltipOnNo () {
      this.$emit('tooltip-no')
      this.hideTooltip()
    }
  }
})
