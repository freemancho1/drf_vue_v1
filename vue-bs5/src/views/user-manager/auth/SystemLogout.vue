<template>
<div class="page-view logout">

    <div class="page-title">{{ pageInfo.LABEL }}</div>

    <div v-if="vuexUser" class="page-section vuex-data">
        <div class="sub-title">Vuex Data</div>

        <div class="page-article basic-info row">
            <div class="col-md-2">
                <label for="id">Id</label>
                <input type="text" name="id" readonly 
                    class="form-control readonly-text" 
                    :value="vuexUser.id"/>
            </div>
            <div class="col-md-5">
                <label for="username">Username</label>
                <input type="text" name="username" readonly 
                    class="form-control readonly-text"
                    :value="vuexUser.username"/>
            </div>
            <div class="col-md-5">
                <label for="email">e-Mail</label>
                <input type="text" name="email" readonly 
                    class="form-control readonly-text"
                    :value="vuexUser.email"/>
            </div>
        </div>

        <div class="page-article token-info my-3">
            <div class="row mt-3">
                <label for="accessToken" class="col-3 col-form-label">
                    Access Token 
                </label>
                <div class="col-9">
                    <input type="text" name="accessToken" readonly  
                        class="form-control readonly-text"
                        :value="vuexAccessToken"/>
                </div>
            </div>
            <div class="row mt-3">
                <label for="refreshToken" class="col-3 col-form-label">
                    Refresh Token 
                </label>
                <div class="col-9">
                    <input type="text" name="refreshToken" readonly  
                        class="form-control readonly-text"
                        :value="vuexRefreshToken"/>
                </div>
            </div>
        </div>
    </div>

    <div v-if="lsUser" class="page-section local-storage-data">
        <div class="sub-title">Local Storage Data</div>

        <div class="page-article basic-info row">
            <div class="col-md-2">
                <label for="id">Id</label>
                <input type="text" name="id" readonly 
                    class="form-control readonly-text" 
                    :value="lsUser.id"/>
            </div>
            <div class="col-md-5">
                <label for="username">Username</label>
                <input type="text" name="username" readonly 
                    class="form-control readonly-text"
                    :value="lsUser.username"/>
            </div>
            <div class="col-md-5">
                <label for="email">e-Mail</label>
                <input type="text" name="email" readonly 
                    class="form-control readonly-text"
                    :value="lsUser.email"/>
            </div>
        </div>

        <div class="page-article token-info my-3">
            <div class="row mt-3">
                <label for="accessToken" class="col-3 col-form-label">
                    Access Token 
                </label>
                <div class="col-9">
                    <input type="text" name="accessToken" readonly  
                        class="form-control readonly-text"
                        :value="lsAccessToken"/>
                </div>
            </div>
            <div class="row mt-3">
                <label for="refreshToken" class="col-3 col-form-label">
                    Refresh Token 
                </label>
                <div class="col-9">
                    <input type="text" name="refreshToken" readonly  
                        class="form-control readonly-text"
                        :value="lsRefreshToken"/>
                </div>
            </div>
        </div>    
    </div>

    <div v-if="!vuexUser && !lsUser" class="page-section non-data">
        <div class="sub-title">No data in Vuex & Local Storage </div>
    </div>

    <div class="page-footer text-center">
        <button type="button" class="btn btn-col-danger my-5"
            @click="logoutHandler">
            Logout 
        </button>
    </div>

    <ModalDialogBox :data="errorMessage" ref="emDialogBox" 
        @closeFn="closeProcess" @yesFn="closeProcess"/>

</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { 
    CFN,                    // Client Function Names
    LSK,                    // Local Storage Keys
    USER_MANAGER,           // UserManager Title & Menus
} from '@/assets/properties'
import LSIOS from '@/assets/services/sys/local-storage-io'
import ModalDialogBox from '@/components/common/ModalDialogBox.vue'

const store = useStore()
const router = useRouter()

const pageInfo = USER_MANAGER.GROUPS[0].MENUS[1]

// Vuex Data
const vuexUser = computed(() => store.getters[CFN.USER_MANAGER.GET_CURR_USER])
const vuexToken = computed(() => store.getters[CFN.USER_MANAGER.GET_CURR_TOKEN])
const vuexAccessToken = computed(() => {
    return `${vuexToken.value[LSK.ACCESS].substring(0,30)} ... ` + 
           `${vuexToken.value[LSK.ACCESS].substr(vuexToken.value[LSK.ACCESS].length-30)}`
})
const vuexRefreshToken = computed(() => {
    return `${vuexToken.value[LSK.REFRESH].substring(0,30)} ... ` + 
           `${vuexToken.value[LSK.REFRESH].substr(vuexToken.value[LSK.REFRESH].length-30)}`
})

// Local Storage Data
const lsUser = computed(() => LSIOS.getUser())
const lsToken = computed(() => LSIOS.getToken())
const lsAccessToken = computed(() => {
    return `${lsToken.value[LSK.ACCESS].substring(0,30)} ... ` + 
        `${lsToken.value[LSK.ACCESS].substr(lsToken.value[LSK.ACCESS].length-30)}`
})
const lsRefreshToken = computed(() => {
    return `${lsToken.value[LSK.REFRESH].substring(0,30)} ... ` + 
        `${lsToken.value[LSK.REFRESH].substr(lsToken.value[LSK.REFRESH].length-30)}`
})

const emDialogBox = ref(null)
const errorMessage = ref({
    title: '',
    content: '',
})
onMounted(() => {
    if (!store.getters[CFN.USER_MANAGER.GET_IS_AUTH]) {
        errorMessage.value = {
            title: 'You have already logged out.',
            content: 'Go to Login page',
            yesLabel: 'Yes',
            style: 'info'
        }
        emDialogBox.value.show()
    }
})

const logoutHandler = () => {
    store.dispatch(CFN.USER_MANAGER.LOGOUT).then(
        // The part that automatically goes to the homepage when you logout 
        // is coded in App.vue.
        // (If you are not logged in throughout the system,
        //  you will be taken to the login page.)
        () => {},
        () => {
            errorMessage.value = {
                title: 'System Error',
                content: store.getters[CFN.USER_MANAGER.GET_COMM_STATE].messages.etc,
                style: 'error',
            }
            // console.log(errorMessage)

            // Error using duplicate Modalbox
            // emDialogBox.value.show()
        }
    )
}

const closeProcess = () => {
    // Go to Login page
    router.push(USER_MANAGER.GROUPS[0].MENUS[0].TO)     
}
</script>