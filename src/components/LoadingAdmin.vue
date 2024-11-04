<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const props = defineProps({
    isLoading: Boolean,
})
const emit = defineEmits(['update:isLoading'])
</script>
<template>
    <loading
        :active="isLoading"
        :can-cancel="true"
        :loader="'dots'"
        class="dark:!bg-dark-primary-1 !bg-light-primary-1"
        :background-color="'white'"
        :color="'#4e4a40'"
        :opacity="0.1"
        @update:active="active => emit('update:isLoading', active)" />
</template>
