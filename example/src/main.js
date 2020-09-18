import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

import ReactiveNavigationBar from '../../src/index.js'
Vue.use(ReactiveNavigationBar)

import VueDemonstration from 'vue-demonstration'
Vue.component('demonstration', VueDemonstration)

new Vue({
  el: '#app',
  render: h => h(App)
})
