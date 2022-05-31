<template>
<div class="page-view login">

    <div class="page-title">{{ pageInfo.LABEL }}</div>

    <button type="button" class="btn btn-success" 
        data-bs-toggle="modal" :data-bs-target="'#'+headOnlyData.id">
        HeadOnly Modal Box
    </button>
    &nbsp;
    <button type="button" class="btn btn-success" 
        data-bs-toggle="modal" data-bs-target="#modal-component">
        Normal Modal Box
    </button>

    <div data-bs-toggle="modal" data-bs-target="'#'+headOnlyData2.id"
        @click="directModalClick"/>

    <ModalDialogBox :data="dialogData" 
        @closeFn="closeProcess" @noFn="noProcess" @yesFn="yesProcess"/>
    <ModalDialogBox :data="headOnlyData" 
        @closeFn="closeProcess" @noFn="noProcess" @yesFn="yesProcess"/>
    <ModalDialogBox :data="headOnlyData2" ref="directModal"
        @closeFn="closeProcess" @noFn="noProcess" @yesFn="yesProcess"/>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VUE3_SYNTAX } from '@/assets/properties'
import ModalDialogBox from '@/components/common/ModalDialogBox.vue'

const pageInfo = VUE3_SYNTAX.GROUPS[0].MENUS[0]

const headOnlyData = ref({
    id: 'headOnlyModal',
    headOnly: true,
    title: 'Head only message',
})

const dialogData = ref({
    headOnly: false,
    title: 'ModalBox Title',
    content: 'ModalBox Content',
    // noLabel: 'Close',
    // yesLabel: 'Ok',
})


const noProcess = () => {
    console.log('noProcess')
}
const yesProcess = () => {
    console.log('yesProcess')
}
const closeProcess = () => {
    console.log('closeProcess')
}


// Modal Box Toggle in Vue.js(Javascript)
// Modal Box Toggle in Vue.js(Javascript)

const headOnlyData2 = ref({
    id: 'headOnlyModal2',
    headOnly: true,
    title: 'Head only message 2',
})
const directModal = ref(null)

onMounted(() => {
    directModal.value.show()
})
</script>