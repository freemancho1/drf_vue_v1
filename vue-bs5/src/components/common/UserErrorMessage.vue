<template>
<div class="component user-error-message">
<div class="error-style">

    <!-- VEE-VALIDATE Error Message -->
    <!-- Client Error Message Display -->
    <ErrorMessage :name="tagName" />

    <!-- Server Error Message Display -->
    <div v-if="serverMessage[tagName]">
        <div v-for="message in serverMessage[tagName]" :key="message">
            {{ message }}
        </div>
    </div>

</div>
</div>
</template>

<script setup>
import { defineProps, } from 'vue'
import { ErrorMessage } from 'vee-validate'

defineProps({
    tagName: String,
    serverMessage: Object,
})

</script>