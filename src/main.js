//引入了一个工厂函数
import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)
console.log(app)
console.log(1111)
createApp(App).mount('#app')
