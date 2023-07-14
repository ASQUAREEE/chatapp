import { createWebHistory, createRouter } from "vue-router"
import Home from './components/Home.vue'
import frontpage from './components/frontpage.vue'
import chat from './components/chat.vue'
import chat1 from './components/chat1.vue'
import pubnubChat from './components/pubnubChat.vue'



const routes =[
    
    
    {

    name: 'Home',
    path: '/home',
    component: Home

},


    {

    name: 'frontpage',
    path: '/front',
    // path: '/',
    component: frontpage

},
    {

    name: 'chat',
    path: '/chat',
    component: chat

},
    {

    name: 'chat1',
    path: '/',
    // path: '/chat1',
    component: chat1

},
    {

    name: 'pubnubChat',
    path: '/pchat',
    component: pubnubChat

},

];



const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;