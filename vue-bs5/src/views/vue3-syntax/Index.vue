<template>
<div class="view vue3-syntax row">

    <div class="col-3 page-menu">
        <PageMenu :menus="VUE3_SYNTAX"/>
    </div>

    <div class="col-9 sub-page">
        <router-view/>
    </div>

</div>
</template>

<script setup>
import PageMenu from '@/components/menus/PageMenu.vue'
import { VUE3_SYNTAX } from '@/assets/properties'
</script>