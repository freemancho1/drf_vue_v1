<template>
<div class="component page-menu">

    <div class="title text-truncate">
        {{ menus.TITLE }}
    </div>

    <div v-for="group in menus.GROUPS" :key="group.TITLE">
        <div class="sub-title text-truncate">
            {{ group.TITLE }}
        </div>
        <div class="list-group">
            <div v-for="menu in group.MENUS" :key="menu.NAME" 
                class="sub-menu row" @click="goSubMenu(menu.TO)">
                <div class="col-2 menu-avatar-area position-relative">
                    <div class="rounded-circle position-relative top-50 translate-middle-y">
                        <span class="material-icons-round position-absolute top-50 start-50 translate-middle">
                            {{ menu.ICON }}
                        </span>
                    </div>
                </div>
                <div class="col-10">
                    <div class="fw-bold menu-label">{{ menu.LABEL }}</div>
                    <div class="menu-caption text-truncate opacity-50 position-relative"
                        data-bs-toggle="tooltip" :title="menu.CAPTION">
                        {{ menu.CAPTION}}
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
// import router from '@/router'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({ 
    menus: { type: Object, default: () => {} }
})

const goSubMenu = (path) => {
    router.push(path)
}

onMounted(() => {
    console.log(props)
    // goSubMenu(props.menus.GROUPS[0].MENUS[0].TO)
})
</script>