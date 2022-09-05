import Vue from 'vue'
import axios from 'axios'

import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        post: {},
        users: [],
        user: {},
        data: {}
    },

    getters: {
        getPosts: state => state.posts,
        getPost: state => state.post,
        getUser: state => state.user,
        getData: state => state.data
    },

    mutations: {
        setPosts: (state,posts) => state.posts = posts,
        setUsers: (state,users) => state.users = users,
        removePost: (state ,title) => state.posts = state.posts.filter(post => post.title !== title),
        setPost: (state,post) => state.post = post,
        setUser: (state,user) => state.user = user,
        setData: (state, data) => state.data = data
    },

    // Menjanje stanja
    _actions: {
        async GET_POSTS({ commit }) {
            await axios
                .get('http://localhost:3003/users')
                .then((response) => {
                    const users = response.data.users
                    commit("setUsers", users)
                    console.log(users)
                })
                .catch((err) => {
                    alert(err)
                })
        },
        async getAllPosts({commit}) {
            const header = {
                headers: {
                    authorization: 'Bearer ${token}'
                }
            }
            await axios
                .get('http://localhost:3003/posts/getPosts', header)
                .then((response) => {
                    const posts = response.data.posts
                    commit("setPosts",posts)
                })
                .catch((err) => {
                    alert(err)
                })
        },
        async addPost({ commit }, payload) {
            await axios
                .post('http://localhost:3003/posts', {
                    title: payload.title,
                    author: payload.author,
                    content: payload.content
                })
                .then((response) => {
                    commit('')
                })
                .catch((err) => {
                    alert(err)
                })
        },
        async registerUser({ commit }, payload) {
            await axios
                .post('http://localhost:3003/users/postUser', {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: payload.email,
                    password: payload.password
                })
                .then((response) => {
                    console.log(response.data.user)
                    commit('')
                })
                .catch((err) => {
                    alert('User already Exists')
                    console.log(err)
                })
        },

        async fetchUser({ commit }) {
            const header = {
                headers: {
                    authorization: 'Bearer ${token}'
                }
            }
            await axios
                .get('http://localhost:3003/users/${email}', header)
                .then((response) => {
                    const user = response.data.user
                    commit('setUser', user)
                })
                .catch((err) => {
                    if (err.response) {
                        const status = err.response.status
                        if (status === 403) {
                            localStorage.removeItem('email')
                            localStorage.removeItem('token')
                            console.error('Err 403 - forbidden')
                        } else {
                            alert(err)
                        }
                    }
                })
        },
        async logInUser({ commit }, user) {
            await axios
                .post('http://localhost:3003/users/logIn', user)
                .then((response) => {
                    const userData = response.data
                    localStorage.setItem('email', userData.user.email)
                    localStorage.setItem('token', userData.token)
                    commit('setUser', userData.user)
                })
                .catch((err) => {
                    alert(err)
                    console.error('Neuspesan login')
                })
        },
        async deletePost({ commit }, title) {
            const header = {
                headers: {
                    authorization: 'Bearer ${token}'
                }
            }
            await axios
                .delete('http://localhost:3003/posts/${title}', header)
                .then((response) => {
                    console.log(response.data.post)
                    commit('removePost', title)
                })
                .catch((err) => {
                    alert(err)
                })
        },
        async searchPost({ commit }) {
            const header = {
                headers: {
                    authorization: 'Bearer ${token}'
                }
            }
            await axios
                .get('http://localhost:3003/posts/${title}', header)
                .then((response) => {
                    const post = response.data.post
                    commit('setPost', post)
                })
                .catch((err) => {
                    alert(err)
                })
        },
        async editPost({ commit }, payload) {
            const token = localStorage.getItem('token')
            const header = {
                headers: {
                    authorization: 'Bearer ${token}'
                }
            }
            console.log(payload);
            const http = 'http://localhost:3003/posts/editPost'
            console.log(http)
            await axios
                .put(http, payload, header)
                .then((response) => {
                    console.log(response.data.post);
                    commit('');
                })
                .catch(() => {})
        },
        async gettingData({ commit }, payload) {
            console.log(payload)
            commit('setData', payload)
        }
    },

    // actions
    get actions() {
        return this._actions
    },
    set actions(value) {
        this._actions = value
    },
})
