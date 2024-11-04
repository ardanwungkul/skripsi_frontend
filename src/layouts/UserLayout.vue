<script setup>
import UserNavigation from '@/components/UserNavigation.vue'
import UserFooter from '@/components/UserFooter.vue'
</script>
<template>
    <div>
        <UserNavigation />
        <div class="bg-gray-200 font-poppins">
            <div class="min-h-screen">
                <slot />
            </div>
        </div>
        <UserFooter />
        <div class="fixed bottom-5 right-5">
            <router-link :to="{ name: 'chat' }">
                <div class="text-green-500">
                    <i class="fa-brands fa-square-whatsapp text-5xl"></i>
                </div>
            </router-link>
        </div>
    </div>
</template>
