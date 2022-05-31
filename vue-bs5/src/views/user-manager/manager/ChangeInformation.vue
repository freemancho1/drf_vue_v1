<template>
<div class="page-view change-information">

    <div class="title">{{ pageInfo.LABEL }}</div>

</div>
</template>

<script setup>
import { USER_MANAGER } from '@/assets/properties'

const pageInfo = USER_MANAGER.GROUPS[1].MENUS[3]
</script>