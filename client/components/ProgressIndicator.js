import comp from '../comp.js'

export default comp({
  templateURL: '/client/components/ProgressIndicator.html',
  props: {
    steps: {
      type: Number,
      default: 2
    },
    activeStep: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onClick (e, stepNumber) {
      e.preventDefault();
      if(stepNumber >= this.activeStep) {
        return
      }
      this.$emit('step-clicked', stepNumber)
    }
  }
})
