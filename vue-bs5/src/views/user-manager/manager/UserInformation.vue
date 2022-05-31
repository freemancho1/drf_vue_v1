<template>
<div class="page-view user-information">

    <div class="title">{{ pageInfo.LABEL }}</div>

</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

import { 
    USER_MANAGER,       // UserManager Title & Groups(Menus)
    CFN,                // Client Function Names
} from '@/assets/properties'

const store = useStore()

const pageInfo = USER_MANAGER.GROUPS[1].MENUS[2]

onMounted(() => {
    store.dispatch(CFN.USER_MANAGER.USER_INFO).then(
        () => {
            console.log('UserInformation Ok')
        },
        () => {
            console.log('UserInformation False')
        }
    )
})
</script>