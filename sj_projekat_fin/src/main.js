import App from './App.vue'
import Vue from 'vue'
import router from './router'
import index from './mainframe'

new Vue({
    router,
    index,
    render: h => h(App)
}).$mount('#app')
