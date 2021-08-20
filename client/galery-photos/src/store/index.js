import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        filterPhoto: [],
        pageCount: 1,
        isLogin: true
    },
    mutations: {
        filterPhoto(state, payload) {
            state.NewMovie = payload
        },
        chagePage(state, payload) {
            state.pageCount = payload
        },
        changeisLogin(state, payload) {
            state.isLogin = payload
        }
    },
    actions: {
        // LOGIN
        login(context, payload) {
            let loginUser = payload
            axios({
                method: 'POST',
                url: '/login',
                data: loginUser
            })
                .then(response => {
                    context.commit('changeisLogin', true)
                    localStorage.setItem('access_token', response.data.access_token)
                    router.push('/')
                })
                .catch((err) => { console.log(err); })
        },
        // REGISTER
        register(context, payload) {
            let newUser = payload
            axios({
                method: 'POST',
                url: '/register',
                data: newUser
            })
                .then(response => {
                    router.push('/login')
                })
                .catch((err) => { console.log(err); })
        },

        // Photo --------------------------------------
        getPhotos(context, payload) {
            const page = context.state.pageCount
            axios({
                method: 'GET',
                url: `/photos`
            })
                .then(response => {
                    context.commit('newMovie', response.data.results)
                })
                .catch((err) => { console.log(err); })
        }
    },
    modules: {
    },
    getters: {
        getFilterPhoto(state) {
            return state.NewMovie
        },
        getPageCount(state) {
            return state.pageCount
        },
        getisLogin(state) {
            return state.isLogin
        }
    }
})
