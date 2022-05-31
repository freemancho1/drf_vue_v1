import * as yup from 'yup'
import { 
    CEC,    // Communication Error Code 
} from '@/assets/properties'

const checkList = {
    required: 'Is Required.',
    invalid: 'Is Invalid.',
    username: {
        min: { 
            value: 3,
            message: 'Must be at least 3 characters.',
        },
        max: {
            value: 20,
            message: 'Must be maximum 20 characters.',
        },
    },
    email: {
        max: {
            value: 100,
            message: 'Must be maximum 100 characters.',
        },
    },
    password: {
        min: {
            value: 8,
            message: 'This password is too short. It must contain at least 8 characters.',
        },
        // 비밀번호 최대 길이는 암호화 하기 때문에 의미가 없음(DB에는 암호화된 128자리로 저장됨)
        // max: {
        //     value: 100,
        //     message: 'This password is too long. '
        // },
    },
    confirmPassword: {
        notMatch: 'Passwords are not matched.'
    },
    systemError: 'Contact your administrator.',
}


class UserValidator {

    loginClientValidator() {

        const schema = yup.object().shape({
            
            username: yup.string()
                .required(checkList.required)
                .min(checkList.username.min.value, checkList.username.min.message)
                .max(checkList.username.max.value, checkList.username.max.message),

            password: yup.string() 
                .required(checkList.required)
                .min(checkList.password.min.value, checkList.password.min.message),

        })

        return schema        
    }

    registerClientValidator() {

        const schema = yup.object().shape({
            
            username: yup.string()
                .required(checkList.required)
                .min(checkList.username.min.value, checkList.username.min.message)
                .max(checkList.username.max.value, checkList.username.max.message),

            email: yup.string()
                .required(checkList.required)
                .max(checkList.email.max.value, checkList.email.max.message)
                .email(checkList.invalid),

            password: yup.string() 
                .required(checkList.required)
                .min(checkList.password.min.value, checkList.password.min.message),

            confirmPassword: yup.string() 
                .required(checkList.required)
                .oneOf([yup.ref('password'), null], checkList.confirmPassword.notMatch),

            isActive: yup.bool()
                .required(checkList.required),

        })

        return schema        
    }

    loginServerValidator(error) {

        const errors = { 
            code: '',
            messages: {
                username: [], 
                password: [],
                etc: [],
            }
        }

        if (error.response.data) {
            for (const key in error.response.data) {
                if (['username', 'password'].includes(key)) {
                    if (typeof(error.response.data[key]) === 'string') {
                        errors.messages[key].push(error.response.data[key])
                    } else {
                        errors.messages[key] = error.response.data[key]
                    }         
                    errors.code = CEC.USER_ERR          
                } else {
                    if (typeof(error.response.data[key]) === 'string') {
                        errors.messages.etc.push(error.response.data[key])
                    } else {
                        errors.messages.etc = [...errors.messages.etc, ...error.response.data[key]]
                    }
                    errors.messages.etc.push(checkList.systemError)
                    errors.code = CEC.SYSTEM_ERR
                }
            }
        } else {
            errors.messages.etc.push(error.message)
            errors.messages.etc.push(checkList.systemError)
            errors.code = CEC.ETC_ERR
        }

        // message.value = 
        //     // (error.response && error.response.data && error.response.data.message) ||
        //     (error.response && error.response.data) ||
        //     error.message || error.toString()

        return errors
    }

    serverValidator(error, checkItems) {

        const errors = { 
            code: '',
            messages: checkItems,
        }
        errors.messages['etc'] = []

        if (error.response.data) {
            for (const key in error.response.data) {
                if (Object.keys(checkItems).includes(key)) {
                    if (typeof(error.response.data[key]) === 'string') {
                        errors.messages[key].push(error.response.data[key])
                    } else {
                        errors.messages[key] = error.response.data[key]
                    }         
                    errors.code = CEC.USER_ERR          
                } else {
                    if (typeof(error.response.data[key]) === 'string') {
                        errors.messages.etc.push(error.response.data[key])
                    } else {
                        errors.messages.etc = [...errors.messages.etc, ...error.response.data[key]]
                    }
                    errors.messages.etc.push(checkList.systemError)
                    errors.code = CEC.SYSTEM_ERR
                }
            }
        } else {
            errors.messages.etc.push(error.message)
            errors.messages.etc.push(checkList.systemError)
            errors.code = CEC.ETC_ERR
        }

        // message.value = 
        //     // (error.response && error.response.data && error.response.data.message) ||
        //     (error.response && error.response.data) ||
        //     error.message || error.toString()

        return errors
    }

}

export default new UserValidator()