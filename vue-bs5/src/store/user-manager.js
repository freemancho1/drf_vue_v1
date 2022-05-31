import rest from '@/assets/services/sys/axios-config'
import { 
    LSK,        // Local Storage Keys
    STN,        // Server Token Names
    CEC,        // Communication Error Code
    URLS,       // Server Service URLs
} from '@/assets/properties'
// import AS from '@/assets/services/auth/account'
import UV from '@/assets/services/auth/user-validator'
import LSIOS from '@/assets/services/sys/local-storage-io'


const initialAuthInfo = (obj) => {
    obj.isAuthenticated = false
    obj.currUser = null 
    obj.currToken = null
}
const setCommState = (obj, code, messages) => {
    obj.commState.code = code 
    obj.commState.messages = messages
}

const store = {
    namespaced: true,

    state: {
        isAuthenticated: false,
        currUser: null,
        currToken: null,
        commState: {
            code: '',
            messages: {}
        }
    },

    actions: {

        login({ commit }, userInfo) {
            return rest.post(URLS.LOGIN, userInfo).then(
                response => {
                    commit('loginSuccess', response.data)
                    return Promise.resolve(response)
                },
                error => {
                    commit('loginFailure', error)
                    return Promise.reject(error)
                }
            )
        },

        logout({commit}) {
            const refreshToken = LSIOS.getRefreshToken()
            return rest.post(URLS.LOGOUT, {refresh: refreshToken}).then(
                response => {
                    commit('logoutSuccess')
                    return Promise.resolve(response)
                },
                error => {
                    commit('logoutFailure')
                    return Promise.reject(error)
                }
            )
        },

        register({commit}, {newUser, checkItems}) {
            console.log(newUser)
            return rest.post(URLS.REGISTER, newUser).then(
                response => {
                    console.log('register 1 ok')
                    commit('registerSuccess')
                    return Promise.resolve(response)
                },
                error => {
                    console.log('register 1 error')
                    console.log(error)
                    commit('registerFailure', {error, checkItems})
                    return Promise.reject(error)
                }
            )
        },

        getUserInfo() {
            console.log('user-manager.getUserInfo start.')
            return rest.get(URLS.USER_LIST).then(
                response => {
                    console.log(response.data)
                    return Promise.resolve(response)
                },
                error => {
                    console.log(error)
                    return Promise.reject(error)
                }
            )
        }

    },

    mutations: {

        initialState(state) {
            const { currUser, currToken } = LSIOS.getAuthInfo()
            if (currUser) {
                state.currUser = currUser 
                state.currToken = currToken 
                state.isAuthenticated = true
            } else {
                initialAuthInfo(state)
            }
        },

        // loginSuccess(state) {
        loginSuccess(state, authInfo) {
            LSIOS.setAuthInfo(authInfo)

            state.isAuthenticated = true 

            state.currUser = authInfo[STN.USER]
            state.currToken = {}
            state.currToken[LSK.ACCESS] = authInfo[STN.ACCESS]
            state.currToken[LSK.REFRESH] = authInfo[STN.REFRESH]

            setCommState(state, CEC.OK, {})
        },
        loginFailure(state, error) {
            initialAuthInfo(state)
            LSIOS.removeAuthInfo()

            const result = UV.loginServerValidator(error)
            setCommState(state, result.code, result.messages)
        },

        logoutSuccess(state) {
            initialAuthInfo(state)
            LSIOS.removeAuthInfo()
            setCommState(state, CEC.OK, {})
        },
        logoutFailure(state) {
            initialAuthInfo(state)
            LSIOS.removeAuthInfo()
            setCommState(state, CEC.ETC, {
                etc: 'An error occurred during logout processing.'})
        }, 

        // Removed the existing authentication information(Local Storage, Vuex) to
        // go to the login page.
        registerSuccess(state) {
            console.log('register ok')
            initialAuthInfo(state)
            LSIOS.removeAuthInfo()
            setCommState(state, CEC.OK, {})
        },
        registerFailure(state, {error, checkItems}) {
            const result = UV.serverValidator(error, checkItems)
            setCommState(state, result.code, result.messages)
            console.log(result.messages)
        }
    },

    getters: {

        getIsAuthenticated(state) {
            return state.isAuthenticated
        },

        getCurrUser(state) {
            return state.currUser
        },
        getCurrToken(state) {
            return state.currToken
        },

        getCommState(state) {
            return state.commState
        }

    },
}

export default store