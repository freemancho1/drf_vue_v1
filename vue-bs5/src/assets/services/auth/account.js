import rest from '@/assets/services/sys/axios-config'
import { URLS } from '@/assets/properties'
import LSIOS from '@/assets/services/sys/local-storage-io'

class AccountService {

    async login({ username, password }) {
        return rest.post(URLS.LOGIN, { username, password })
    }
    async login2({ username, password }) {
        return rest.post(URLS.LOGIN, { username, password }).then(
            response => {
                LSIOS.setAuthInfo(response.data)
                return Promise.resolve(response)
            },
            error => {
                
                return Promise.reject(error)
            }
        )
    }

    async logout(refreshToken) {
        return rest.post(URLS.LOGOUT, {refresh: refreshToken})
    }

    async register(userInfo) {
        return rest.post(URLS.REGISTER, userInfo)
    }

    async getUserInfo() {
        return rest.get(URLS.USER_INFO)
    }

    async getUserList() {
        return rest.get(URLS.USER_LIST)
    }

}

export default new AccountService()