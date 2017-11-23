import App from './App.js'
import Index from './pages/index.js'
import Setup from './pages/setup.js'
import Login from './pages/login.js'
import Backlog from './pages/backlog.js'
import Projects from './pages/projects.js'

export default [
  { path: '/', name: 'index', component: Index },
  { path: '/setup', name: 'setup', component: Setup },
  { path: '/login', name: 'login', component: Login },
  { path: '/backlog', name: 'backlog', component: Backlog },
  { path: '/projects', name: 'projects', component: Projects },
]