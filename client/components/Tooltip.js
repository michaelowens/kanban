import comp from '../comp.js'

export default comp({
  templateURL: '/client/components/Tooltip.html',

  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
})
