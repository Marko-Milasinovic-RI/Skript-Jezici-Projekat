import App from './App.vue'
import Vue from 'vue'
import router from './router'
import mainframe from './store'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
