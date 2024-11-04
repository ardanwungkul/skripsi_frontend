<script setup>
import { useUsers } from '../stores/auth'
import DashboardAdmin from '@/pages/admin/Dashboard.vue'
import DashboardSupport from '@/pages/support/Dashboard.vue'
import { onBeforeMount, computed, ref, watch } from 'vue'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import router from '../router'

const isLoading = ref(true)
const auth = useUsers()
onBeforeMount(() => {
    if (!auth.hasUserData) {
        auth.getData()
    }
})
const role = computed(() => auth.userData.role)
watch(
    role,
    newRole => {
        if (auth.userData) {
            isLoading.value = false
            if (newRole === 'user') {
                router.push({ name: 'welcome' })
            }
        }
    },
    { immediate: true },
)
</script>

<template>
    <LoadingAdmin :isLoading="isLoading" />
    <DashboardAdmin v-if="role == 'admin'" />
    <DashboardSupport v-if="role == 'support'" />
</template>
