<script setup>
import { ref, watchEffect } from 'vue'
import Logo from '@/assets/images/logo.png'
const isDark = ref(localStorage.getItem('isDark') === 'true')
watchEffect(() => {
    localStorage.setItem('isDark', isDark.value)
})
</script>

<template>
    <div
        :class="isDark ? 'dark' : ''"
        class="w-full bg-gradient-to-r from-[#0a1b65] to-[#0a5b66] dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900 h-screen">
        <div class="h-full flex items-center justify-center bg-moon">
            <div class="grid grid-cols-2 flex-auto">
                <div class="col-span-1 self-center pt-6 bg-transparent mb-5">
                    <router-link to="/" class="flex justify-center">
                        <img :src="Logo" class="w-auto" src="" alt="" />
                    </router-link>
                </div>
                <div class="col-span-1 self-center px-32">
                    <div
                        class="dark:bg-[#1f2937eb] bg-[#ffffffb3] backdrop-blur-sm px-6 py-7 self-center shadow-md border dark:!border-light-primary-1 !border-[#ff8600] rounded-lg font-sans">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
