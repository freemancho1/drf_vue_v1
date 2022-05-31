import { LSK, STN } from '@/assets/properties'

class LocalStorageIOService {

    getUser() {
        try {
            return JSON.parse(
                localStorage.getItem(LSK.USER)
            )
        } catch(TypeError) {
            return false
        }
    }
    getToken() {
        try {
            return JSON.parse(
                localStorage.getItem(LSK.TOKEN)
            )
        } catch(TypeError) {
            return false
        }
    }
    setUser(user) {
        localStorage.setItem(
            LSK.USER, JSON.stringify(user)
        )
    }
    setToken(token) {
        localStorage.setItem(
            LSK.TOKEN, JSON.stringify(token)
        )
    }

    getAuthInfo() {
        return { 
            currUser: this.getUser(), 
            currToken: this.getToken(),
        }
    }
    setAuthInfo(authInfo) {
        this.setUser(authInfo[STN.USER])

        const token = {}
        token[LSK.ACCESS] = authInfo[STN.ACCESS]
        token[LSK.REFRESH] = authInfo[STN.REFRESH]
        this.setToken(token)
    }
    removeAuthInfo() {
        console.log('LSIOS.removeAuthInfo start:')
        localStorage.removeItem(LSK.USER)
        localStorage.removeItem(LSK.TOKEN)
    }    

    getAccessToken() {
        try {
            return this.getToken()[LSK.ACCESS]
        } catch(TypeError) {
            return false
        }
    }
    getRefreshToken() {
        try {
            return this.getToken()[LSK.REFRESH]
        } catch(TypeError) {
            return false
        }
    }
    setReAccessToken(accessToken) {
        const token = this.getToken()
        token[LSK.ACCESS] = accessToken 
        this.setToken(token)
    }

}

export default new LocalStorageIOService()