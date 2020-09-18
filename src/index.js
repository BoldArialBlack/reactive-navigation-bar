import ReactiveNavigationBar from './components/nav-bar.vue'
import './styles/index.less'

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.component('ReactiveNavigationBar', ReactiveNavigationBar)
}

if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('ReactiveNavigationBar', ReactiveNavigationBar)
}

ReactiveNavigationBar.install = install

export default ReactiveNavigationBar
