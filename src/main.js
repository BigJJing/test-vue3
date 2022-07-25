import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
window.global = window
// import ElementPlus from 'element-plus'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const routes = [
    { path: '/', component: import("@/components/Table.vue") },
    { path: '/table2', component: import("@/components/Table2.vue") },
    { path: '/ElementTable', component: import("@/components/ElementTable.vue") },
    { path: '/Socket', component: import("@/components/Socket.vue") },
  ]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }   
app
.use(router)
.mount('#app')
