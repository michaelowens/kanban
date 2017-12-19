import comp from './comp.js'
import Navbar from './components/Navbar.js'
import Sidenav from './components/Sidenav.js'

export default comp({
  templateURL: '/client/view/index.html',

  components: {Navbar, Sidenav},
})
