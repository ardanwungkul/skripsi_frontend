<script setup>
import SupportLayout from '@/layouts/SupportLayout.vue'
import { dashboardStore } from '@/stores/dashboard'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import { onBeforeMount, ref } from 'vue'
import { useUsers } from '@/stores/auth'

const auth = useUsers()
const data = ref([])
const isLoading = ref(true)
const store = dashboardStore()
onBeforeMount(async () => {
    if (!auth.hasUserData) {
        auth.getData()
    }
    await store.getDataSupport(auth.userData.id)
    data.value = store.data
    isLoading.value = false
})
</script>
<template>
    <SupportLayout title="Dashboard">
        <LoadingAdmin :isLoading="isLoading" />
        <div class="grid grid-cols-3 gap-4 p-4">
            <div
                class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                <div
                    class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                    <i
                        class="fa-solid fa-list-check dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">
                        {{ data.todo_count }}
                    </p>
                    <p
                        class="dark:text-typography-2 font-light tracking-widest text-sm">
                        Todo
                    </p>
                </div>
            </div>
            <div
                class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                <div
                    class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                    <i class="fa-solid fa-rotate dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">
                        {{ data.doing_count }}
                    </p>
                    <p
                        class="dark:text-typography-2 font-light tracking-widest text-sm">
                        Doing
                    </p>
                </div>
            </div>
            <div
                class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                <div
                    class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                    <i class="fa-solid fa-check dark:text-white text-2xl"></i>
                </div>
                <div class="flex justify-center flex-col items-center w-full">
                    <p class="dark:text-white text-3xl font-normal">
                        {{ data.done_count }}
                    </p>
                    <p
                        class="dark:text-typography-2 font-light tracking-widest text-sm">
                        Done
                    </p>
                </div>
            </div>
        </div>
        <div class="grid p-4 gap-4">
            <div
                class="rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 gap-4 p-4 bg-hexagon min-h-40">
                <p class="dark:text-typography-1 text-xl border-b pb-3 mb-3">
                    Order Website
                </p>
                <div class="space-y-3">
                    <div v-for="(todo, index) in data.todolist" :key="index">
                        <div
                            class="flex dark:bg-dark-primary-1 bg-light-primary-2 dark:text-typography-1 px-3 py-2 rounded-lg shadow-lg">
                            <p>
                                {{ todo.order.domain_name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SupportLayout>
</template>
