<template>
<div class="view user-manager row">

    <div class="col-3 page-menu">
        <PageMenu :menus="USER_MANAGER"/>
    </div>

    <div class="col-9 sub-page">
        <router-view/>
    </div>

</div>
</template>

<script setup>
import PageMenu from '@/components/menus/PageMenu.vue'
import { USER_MANAGER } from '@/assets/properties'
</script>