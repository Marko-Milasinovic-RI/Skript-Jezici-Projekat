import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AllPosts from '../views/AllPosts.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Post from '../views/Post.vue'
import UserProfile from '../views/UserProfile.vue'
import EditPost from '../views/EditPost.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/opis',
        name: 'Opis',
        component: () => import('../views/Opis.vue')
    },
    {
        path: '/loginPage',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/allPosts',
        name: 'AllPosts',
        component: AllPosts
    },
    {
        path: '/registerPage',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/post',
        name: 'Post',
        component: Post
    },
    {
        path: '/userProfile',
        name: 'UserProfile',
        component: UserProfile
    },
    {
        path: '/editPost',
        name: 'EditPost',
        component: EditPost
    },
]

const router = new VueRouter({
    routes
})

export default router