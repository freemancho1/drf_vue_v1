<template>
<div class="page-view sign-up">

    <div class="page-title">{{ pageInfo.LABEL }}</div>

    <Form 
        @submit="registerHandler" 
        @invalid-submit="onInvalidSubmit"
        :validation-schema="schema"
        class="page-section register-form">
        
        <div class="sub-title col-12">Basic Information</div>
        <div class="page-article basic-information row">
            <div class="col-md-6 form-group">
                <label for="username">Username</label>
                <Field 
                    type="text" 
                    name="username"
                    class="form-control" 
                    autocomplete="off"/>
                <UserErrorMessage 
                    tagName="username"
                    :serverMessage="errors"/></div>

            <div class="col-md-6 form-group">
                <label for="email">e-Mail</label>
                <Field type="text" name="email"
                    class="form-control" autocomplete="off"/>
                <UserErrorMessage tagName="email" :serverMessage="errors"/></div>

            <div class="col-md-6 form-group">
                <label for="password">Password</label>
                <Field type="password" name="password" class="form-control"/>
                <UserErrorMessage tagName="password" :serverMessage="errors"/></div>            

            <div class="col-md-6 form-group">
                <label for="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" class="form-control"/>
                <UserErrorMessage tagName="confirmPassword" :serverMessage="errors"/></div>         

            <div class="col-md-6 form-group from-check">
                <Field 
                    name="isActive" type="checkbox"
                    :value="true" class="form-check-input"/>
                <!-- <input id="isActive" type="checkbox" v-model="isActive"
                    class="form-check-input" value=""> -->
                <label 
                    for="isActive" 
                    class="form-check-label ms-3">
                    Is Active </label>
                <UserErrorMessage tagName="isActive" :serverMessage="errors"/></div>         

            <div class="col-md-6 form-group from-check">
                <Field 
                    name="isStaff" type="checkbox"
                    :value="true" class="form-check-input"/>
                <label 
                    for="isStaff" 
                    class="form-check-label ms-3">
                    Is Staff </label></div></div>

        <div class="sub-title col-12">More Information
            <span class="sub-title-caption ms-4">[Optional]</span>
        </div>  
        <div class="page-article more-information row">
            <div class="col-md-6 form-group">
                <label for="firstName">First Name</label>
                <Field type="text" name="firstName"
                    class="form-control" autocomplete="off"/>
            </div>
            <div class="col-md-6 form-group">
                <label for="lastName">First Name</label>
                <Field type="text" name="lastName"
                    class="form-control" autocomplete="off"/>
            </div>
        </div>

        <div class="form-group text-center my-5">
            <button 
                class="btn btn-block btn-col-primary"
                :disabled="loading">
                <span 
                    v-show="loading"
                    class="spinner-border spinner-border-sm"/>
                <span>Register</span>
            </button>
        </div>

        <UserErrorMessage 
            tagName="etc"
            :serverMessage="errors"/>

    </Form>

    <MessageBox 
        :data="infoMessage" 
        ref="imDialogBox"
        @yesFn="goLoginPage"/>

</div>
</template>

<script setup>
import { ref, } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form, Field, } from 'vee-validate'

import { 
    CFN,                // Client Function Names
    USER_MANAGER,       // UserManager Title & Menus
} from '@/assets/properties'
import UV from '@/assets/services/auth/user-validator'
import UserErrorMessage from '@/components/common/UserErrorMessage.vue'
import MessageBox from '@/components/common/ModalDialogBox.vue'

const router = useRouter()
const store = useStore()


// Page Title
const pageInfo = USER_MANAGER.GROUPS[1].MENUS[0]


// Vee-validator & System error message
const schema = UV.registerClientValidator()
const checkItems = {
    username: [], password: [], confirmPassword: [],
    email: [], isActive: [],
}
const errors = ref(checkItems)
// const errors = ref({
//     username: [], password: [], confirmPassword: [],
//     email: [], isActive: [],
// })


// Modal Dialog Box
const imDialogBox = ref(null)
const infoMessage = ref({})
const goLoginPage = () => {
    router.push(USER_MANAGER.GROUPS[0].MENUS[0].TO)
}


// Register Handler
const loading = ref(false)
const registerHandler = (newUser) => {
    loading.value = true
    errors.value = checkItems

    delete newUser.confirmPassword
    store.dispatch(CFN.USER_MANAGER.REGISTER, {newUser, checkItems}).then(
        () => {
            loading.value = false
            infoMessage.value = {
                title: 'User registration complete.',
                content: `Username: ${newUser.username}, e-Mail: ${newUser.email}`,
                style: 'info',
                yesLabel: 'Ok',
            }
            imDialogBox.value.show()
        },
        (error) => {
            loading.value = false
            // errors.value = store.getters[CFN.USER_MANAGER.GET_COMM_STATE].messages
            // 이 값이 출력되지 않음
            // 이 값이 출력되지 않음
            // 이 값이 출력되지 않음
            // 이 값이 출력되지 않음
            errors.value = UV.serverValidator(error, checkItems).messages
            console.log(errors.value.username)
            errors.value.email=['aaa']
            console.log(errors.value)
        }
    )
}
const onInvalidSubmit = ({values, errors, results}) => {
    console.log('values, errors, results')
    console.log(values)
    console.log(errors)
    console.log(results)
}
</script>