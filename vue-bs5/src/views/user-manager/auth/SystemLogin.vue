<template>
<div class="page-view login">

    <div class="page-title">{{ pageInfo.LABEL }}</div>

    <div class="card card-container">

        <span class="material-icons-round avatar">
            account_circle
        </span>

        <Form @submit="loginHandler" :validation-schema="schema">

            <div class="form-group">
                <label for="username">Username:</label> 
                <Field name="username" type="text" class="form-control" 
                        autocomplete="off"/>
                <UserErrorMessage tagName="username" :serverMessage="errors"/>
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <Field name="password" type="password" class="form-control"/>
                <UserErrorMessage tagName="password" :serverMessage="errors"/>
            </div>

            <div class="form-group text-center my-5">
                <button class="btn btn-block btn-login" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Login</span>
                </button>
            </div>

        </Form>

        <UserErrorMessage tagName="etc" :serverMessage="errors"/>

    </div>

    <MessageBox :data="infoMessage" ref="mDialogBox" @closeFn="closeProcess"/>

</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { Form, Field, } from 'vee-validate'

import UV from '@/assets/services/auth/user-validator'
import UserErrorMessage from '@/components/common/UserErrorMessage.vue'
import MessageBox from '@/components/common/ModalDialogBox.vue'
import { CFN,           // Client Function Names 
        //  CEC,           // Communication Error Code
         HMENU,         // Home Menu
         USER_MANAGER   // UserManager Title & Menus
} from '@/assets/properties'

const store = useStore()
const router = useRouter()

const pageInfo = USER_MANAGER.GROUPS[0].MENUS[0]

const schema = UV.loginClientValidator()
const loading = ref(false)
const errors = ref({ username: '', password: '', message: '', })

const isAuthenticated = 
    computed(() => store.getters[CFN.USER_MANAGER.GET_IS_AUTH])

const infoMessage = ref({
    title: 'You are already logged in.',
    content: 'Go to Logout page',
    style: 'info',
})
const mDialogBox = ref(null)
onMounted(() => {
    if (isAuthenticated.value) {
        mDialogBox.value.show()
    }
})
const closeProcess = () => {
    // Go to Logout page
    router.push(USER_MANAGER.GROUPS[0].MENUS[1].TO)
}

const loginHandler = (user) => {
    loading.value = true 
    errors.value = { username: '', password: '', message: '', }

    store.dispatch(CFN.USER_MANAGER.LOGIN, user).then(
        () => {
            loading.value = false 
            router.push(HMENU.TO)
        },
        () => {
            errors.value = store.getters[CFN.USER_MANAGER.GET_COMM_STATE].messages
            loading.value = false
        }
    )
}
</script>