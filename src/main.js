import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 路由拦截器
import '@/utils/filter'

Vue.use(ElementUI)
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio,socketio('http://139.224.3.132:8125/'));//与服务端链接

Vue.config.productionTip = false // 阻止启动生产消息
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
