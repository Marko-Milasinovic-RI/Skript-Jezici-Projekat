import App from './App.vue'
import Vue from 'vue'
import router from './router'
import store from './mainframe'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
