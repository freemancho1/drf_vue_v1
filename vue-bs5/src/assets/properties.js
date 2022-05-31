import Home from '@/views/sys/Home.vue'

import Vue3Syntax from '@/views/vue3-syntax/Index.vue'
import PropsAndEmits from '@/views/vue3-syntax/PropsAndEmits.vue'

import Todos from '@/views/todos/Index.vue'

import UserManager from '@/views/user-manager/Index.vue'
import Login from '@/views/user-manager/auth/SystemLogin.vue'
import Logout from '@/views/user-manager/auth/SystemLogout.vue'
import SignUp from '@/views/user-manager/manager/SignUp.vue'
import UserInformation from '@/views/user-manager/manager/UserInformation.vue'
import ChangeInformation from '@/views/user-manager/manager/ChangeInformation.vue'
import ChangePassword from '@/views/user-manager/manager/ChangePassword.vue'

import ReadMe from '@/views/sys/ReadMe.vue'

export const PROJECT_NAME = 'AI Platform'

// Home Menus
export const HMENU = {
    ID              : -1,
    LABEL           : 'Home',
    NAME            : 'Home',
    TO              : '/',
    COMPONENT       : Home,
}

// Left Main Menus
export const LMENUS = [
    { 
        ID          : 0, 
        LABEL       : 'Vue3 Syntax', 
        NAME        : 'Vue3Syntax', 
        TO          : '/vue3-syntax',
        COMPONENT   : Vue3Syntax,
    },
    {
        ID          : 1, 
        LABEL       : 'Todos', 
        NAME        : 'Todos', 
        TO          : '/todos',
        COMPONENT   : Todos,
    },
    {
        ID          : 2, 
        LABEL       : 'User Manager', 
        NAME        : 'UserManager', 
        TO          : '/user-manager',
        COMPONENT   : UserManager,
    },
]

// Right Main Menus
export const RMENUS = [
    {
        ID          : 3,
        LABEL       : 'Read Me',
        NAME        : 'ReadMe',
        TO          : '/read-me',
        TO2         : 'https://github.com/freemancho1/drf_vue_v1',
        COMPONENT   : ReadMe,
    }
]

export const VUE3_SYNTAX = {
    TITLE: 'Vue.js 3 Syntax',
    GROUPS: [
        {
            TITLE: 'Odds And Ends',
            MENUS: [
                {
                    LABEL: 'Props And Emits',
                    NAME: 'PropsAndEmits',
                    TO: '/vue3-syntax/props-and-emits',
                    ICON: 'mobiledata_off',
                    COMPONENT: PropsAndEmits,
                    CAPTION: 'defineProps, defineEmits, Dynamically replace HTML ID',
                }
            ]
        }
    ]
}

export const USER_MANAGER = {
    TITLE: 'User Manager',
    GROUPS: [
        {
            TITLE: 'Authentication',
            MENUS: [
                {
                    LABEL: 'Login', NAME: 'Login',
                    TO: '/auth/login',
                    ICON: 'login',
                    COMPONENT: Login,
                    CAPTION: 'How to use REST API Login using Axios',
                },
                {
                    LABEL: 'Logout', NAME: 'Logout',
                    TO: '/auth/logout',
                    ICON: 'logout',
                    COMPONENT: Logout,
                    CAPTION: 'How to use REST API Logout using Axios',
                },
            ]
        },
        {
            TITLE: 'Management',
            MENUS: [
                {
                    LABEL: 'Sign Up', NAME: 'SignUp',
                    TO: '/manager/sign-up',
                    ICON: 'person_add',
                    COMPONENT: SignUp,
                    CAPTION: 'How to use REST API Sign-up using Axios',
                },
                {
                    LABEL: 'Change Password', NAME: 'ChangePassword',
                    TO: '/manager/change-password',
                    ICON: 'password',
                    COMPONENT: ChangePassword,
                    CAPTION: 'How to use REST API Change Password using Axios',
                },
                {
                    LABEL: 'User Information', NAME: 'UserInformation',
                    TO: '/manager/user-information',
                    ICON: 'assignment_ind',
                    COMPONENT: UserInformation,
                    CAPTION: 'How to use REST API User Information using Axios',
                },
                {
                    LABEL: 'Change Information', NAME: 'ChangeInformation',
                    TO: '/manager/change-information',
                    ICON: 'badge',
                    COMPONENT: ChangeInformation,
                    CAPTION: 'How to use REST API Change Information using Axios',
                },
            ]
        }
    ]
}

// Server side URLs
export const URLS = {
    LOGIN               : 'api/login/',
    LOGOUT              : 'api/logout/',
    REFRESH             : 'api/token/refresh/',
    REGISTER            : 'api/users/',
    USER_INFO           : 'api/user/',
    // USER_INFO           : 'api/users/me/',
    USER_LIST           : 'api/user/',
}

// Client Function Names
export const CFN = {
    USER_MANAGER: {
        INITIAL_STATE   : 'UserManager/initialState',
        LOGIN           : 'UserManager/login',
        LOGIN2          : 'UserManager/login2',
        REGISTER        : 'UserManager/register',
        REFRESH_ACCESS_TOKEN: 'UserManager/refreshAccessToken',
        LOGOUT          : 'UserManager/logout',
        USER_LIST       : 'UserManager/userList',
        USER_INFO       : 'UserManager/getUserInfo',
        GET_IS_AUTH     : 'UserManager/getIsAuthenticated',
        GET_CURR_USER   : 'UserManager/getCurrUser',
        GET_CURR_TOKEN  : 'UserManager/getCurrToken',
        GET_COMM_STATE  : 'UserManager/getCommState',
    },
    MENUS: {
        // Function name
        // Current Menu Id
        GET_CMI: 'Menus/getCurrentMenuId',
        SET_CMI: 'Menus/setCurrentMenuId',
        // Constant name
        NON_SELECTION_MENU_ID: -2, // -1: Home
    }
} 

// Local Storage Keys
export const LSK = {
    USER                : 'userxxxx',
    TOKEN               : 'tokenxxx',
    ACCESS              : 'accessxx',
    REFRESH             : 'refreshx',   
    AXIOS_ERROR         : 'axioserror', 
}

// Server Token Names
export const STN = {
    USER                : 'user',
    ACCESS              : 'access',
    REFRESH             : 'refresh',    
}

export const AXIOS_CONFIG = {
    BASE_URL            : 'http://localhost:8000',
    HEADERS             : {
        'Content-Type'  : 'application/json',
    },
    AUTH_TYPE           : 'Authorization',
    AUTH_VALUE          : 'Bearer',
}

// Communication Error Code
export const CEC = {
    OK                  : '200',
    USER_ERR            : '300',
    SYSTEM_ERR          : '400',
    ETC_ERR             : '500',
}