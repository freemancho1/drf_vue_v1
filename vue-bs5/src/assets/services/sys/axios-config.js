import axios from 'axios'
import { AXIOS_CONFIG } from '@/assets/properties'

const axiosInstance = axios.create({
    baseURL: AXIOS_CONFIG.BASE_URL,
    headers: AXIOS_CONFIG.HEADERS,
})

export default axiosInstance