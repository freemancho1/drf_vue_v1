<template>
<div class="component modal-dialog-box">

    <div :id="data.id ? data.id: 'modal-component'" 
        class="modal fade" ref="modalDialogBox"
        data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        arial-labelledby="modal-component-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header"
                :class="data.style ? data.style: 'normal'">
                <div class="modal-title" id="modal-component-label"
                    :class="data.headOnly ? 'mc-message': 'mc-title'">
                    {{ data.title }}
                </div>
                <button 
                    v-if="data.headOnly"
                    type="button" 
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal" 
                    aria-label="Close" 
                    @click="emits('closeFn')"/>
            </div>

            <div 
                v-if="!data.headOnly" 
                class="modal-body"
                :class="data.style ? data.style: 'normal'">
                {{ data.content }}
            </div>

            <div v-if="!data.headOnly && (data.noLabel || data.yesLabel)"
                class="modal-footer">
                <button v-if="data.noLabel"
                    type="button" class="btn btn-no" 
                    :class="data.style ? data.style: 'normal'"
                    data-bs-dismiss="modal"
                    @click="noClick">
                    {{ data.noLabel }} 
                </button>
                <button v-if="data.yesLabel" 
                    type="button" class="btn btn-yes"
                    :class="data.style ? data.style: 'normal'"
                    data-bs-dismiss="modal"
                    @click="emits('yesFn')">
                    {{ data.yesLabel }}
                </button>
            </div>

        </div>
        </div>
    </div>

</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose, onMounted } from 'vue'
import { Modal } from 'bootstrap'

defineProps({
    data: {
        type: Object,
        default: () => {},
    },
    // data {
    //     id          - Modal Box ID('modal-component')
    //     headOnly    - Display Head Only(false)
    //     title       - Head Message(REQUIRED)
    //     content     - Content Message(If only the head is displayed, it is not output)
    //     style       - ('normal'), 'error', 'info'
    //     yesLabel    - Yes button label(if the value is null, the yes button is not displayed)
    //     noLabel     - No button label(if the value is null, the no button is not displayed)
    // }
    // show: {
    //     type: Boolean,
    //     default: false,
    // }
})
const emits = defineEmits(['closeFn', 'noFn', 'yesFn'])


// Modal Box Toggle in Vue.js(Javascript)
// Modal Box Toggle in Vue.js(Javascript)

const modalDialogBox = ref(null)
let modalObj = null

onMounted(() => {
    modalObj = new Modal(modalDialogBox.value)
})

const _show = () => {
    modalObj.show()
}

defineExpose({ show: _show})
</script>