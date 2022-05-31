import rest from './axios-config'
import LSIOS from './local-storage-io'
import { STN, CFN, URLS, AXIOS_CONFIG } from '@/assets/properties'

// Client Function Name: User Manager
const CFNU = CFN.USER_MANAGER


const setup = (store) => {

    rest.interceptors.request.use(
        (config) => {
            try {
                const accessToken = LSIOS.getAccessToken()
                if (accessToken) {
                    config.headers[AXIOS_CONFIG.AUTH_TYPE] = 
                        `${AXIOS_CONFIG.AUTH_VALUE} ${accessToken}`
                    console.log(config.headers[AXIOS_CONFIG.AUTH_TYPE])
                }
            } catch (error) {
                config.headers[AXIOS_CONFIG.AUTH_TYPE] = ''                
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }       
    )

    rest.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            const orgConfig = error.config 
            if (orgConfig.url !== URLS.LOGIN && error.response) {
                if (orgConfig.url === URLS.REFRESH) {
                    store.dispatch(CFNU.LOGOUT)
                    return
                }
                if (error.response.status === 401 && !orgConfig._retry) {
                    orgConfig._retry = true
                    try {
                        const reqData = {}
                        reqData[STN.REFRESH] = LSIOS.getRefreshToken()
                        const rresponse = 
                            await rest.post(URLS.REFRESH, reqData)
                        
                        const access = rresponse.data.access 
                        store.dispatch(CFNU.REFRESH_ACCESS_TOKEN, access)
                        
                        return rest(orgConfig)
                    } catch(eerror) {
                        return Promise.reject(eerror)
                    }
                }
            }
            return Promise.reject(error)
        }
    )   
}

export default setup