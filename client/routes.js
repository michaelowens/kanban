import App from './App.js'
import Setup from './pages/setup.js'
import Backlog from './pages/backlog.js'
import Projects from './pages/projects.js'

export default [
  { path: '/', component: App },
  { path: '/setup', component: Setup },
  { path: '/backlog', component: Backlog },
  { path: '/projects', component: Projects },
]