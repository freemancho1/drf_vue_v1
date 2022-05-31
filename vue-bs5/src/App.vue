<template>
<div id="ai-root">

    <MainMenu/>
    <div class="container-lg">
        <router-view/>
    </div>

</div>
</template>

<script setup>
import { computed, onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import MainMenu from '@/components/menus/MainMenu.vue'
import { USER_MANAGER,      // UserManager Menus
         CFN,               // Client Function Names
} from '@/assets/properties'
const initUserVuex = CFN.USER_MANAGER.INITIAL_STATE
const getAuthInfo = CFN.USER_MANAGER.GET_IS_AUTH

const router = useRouter()
const store = useStore()

onBeforeMount(() => {
    store.commit(initUserVuex)
})

const isAuthenticated = computed(() => store.getters[getAuthInfo])
watch(isAuthenticated, (newValue) => {
    if (!newValue) {
        // Go to Login page
        router.push(USER_MANAGER.GROUPS[0].MENUS[0].TO)
    }
})
</script>

<style lang="scss">
@import '@/styles/main'
</style>
