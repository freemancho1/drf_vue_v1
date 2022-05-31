<template>
<div class="component main-menu">
<nav class="navbar navbar-expand-md sticky-top">
<div class="container-lg">

    <a class="navbar-brand" @click="goMenuPath(HMENU.TO)">
        <img src="/favicon.ico" alt="Brand Image"
            width="30" height="30"
            class="d-inline-block align-text-bottom"/>
        {{ PROJECT_NAME }}
    </a>
    <button class="navbar-toggler" type="button" 
        data-bs-toggle="collapse" data-bs-target="#mainMenu" 
        aria-controls="mainMenu" aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="material-icons-round">menu</span>
    </button>

    <div class="collapse navbar-collapse" id="mainMenu">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-for="menu in LMENUS" :key="menu.ID" 
                class="nav-item nav-link" :class="{active: activeMenu[menu.ID]}"
                @click="goMenuPath(menu.TO)">
                {{ menu.LABEL }}
            </li>
        </ul>

        <ul class="navbar-nav mb-2 mb-lg-0">
            <li v-for="menu in RMENUS" :key="menu.ID" 
                class="nav-item nav-link" :class="{active: activeMenu[menu.ID]}"
                @click="goMenuPath(menu.TO)">
                {{ menu.LABEL }}
            </li>
        </ul>      
    </div>
    
</div>
</nav>
</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { PROJECT_NAME, CFN, 
         LMENUS, RMENUS, HMENU } from '@/assets/properties'

const store = useStore()
const router = useRouter()

const activeMenu = ref(new Array(LMENUS.length+RMENUS.length))
const currMenuId = computed(() => store.getters[CFN.MENUS.GET_CMI])
watch(currMenuId, (newValue) => {
    activeMenu.value.fill(false)
    if (newValue >= 0 && newValue < activeMenu.value.length) {
        activeMenu.value[newValue] = true
    }
})

const goMenuPath = (path) => {
    router.push(path)
}
</script>