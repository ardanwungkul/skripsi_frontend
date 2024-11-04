<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import DomainChart from '@/components/dashboard/DomainChart.vue'
import { dashboardStore } from '@/stores/dashboard'
import { onBeforeMount, ref } from 'vue'
import LoadingAdmin from '@/components/LoadingAdmin.vue'

const isLoading = ref(true)
const store = dashboardStore()
const data = ref([])
onBeforeMount(async () => {
    await store.getData()
    data.value = store.data
    isLoading.value = false
})
</script>
<template>
    <AdminLayout title="Dashboard">
        <LoadingAdmin :isLoading="isLoading" />
        <div class="space-y-4" v-if="!isLoading">
            <!-- <div>
                <div class="relative shadow-lg dark:shadow-typography-3">
                    <input
                        type="search"
                        placeholder="Search "
                        class="w-full rounded-lg dark:bg-dark-primary-2 border-none dark:text-white pr-10" />
                    <div
                        class="absolute right-0 top-0 h-10 flex items-center justify-center w-10">
                        <i
                            class="fa-solid fa-magnifying-glass dark:text-white"></i>
                    </div>
                </div>
            </div> -->
            <div class="grid grid-cols-3 gap-4">
                <div
                    class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                    <div
                        class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                        <i
                            class="fa-solid fa-globe dark:text-white text-2xl"></i>
                    </div>
                    <div
                        class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">
                            {{ data.domain }}
                        </p>
                        <p
                            class="dark:text-typography-2 font-light tracking-widest text-sm">
                            Total Domain
                        </p>
                    </div>
                </div>
                <div
                    class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                    <div
                        class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                        <i
                            class="fa-solid fa-users dark:text-white text-2xl"></i>
                    </div>
                    <div
                        class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">
                            {{ data.user }}
                        </p>
                        <p
                            class="dark:text-typography-2 font-light tracking-widest text-sm">
                            Total User
                        </p>
                    </div>
                </div>
                <div
                    class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                    <div
                        class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                        <i
                            class="fa-solid fa-server dark:text-white text-2xl"></i>
                    </div>
                    <div
                        class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">
                            {{ data.vendor }}
                        </p>
                        <p
                            class="dark:text-typography-2 font-light tracking-widest text-sm">
                            Total Vendor
                        </p>
                    </div>
                </div>
                <div
                    class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                    <div
                        class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                        <i
                            class="fa-solid fa-arrow-right-arrow-left dark:text-white text-2xl"></i>
                    </div>
                    <div
                        class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">
                            {{ data.unpaid_order }}
                        </p>
                        <p
                            class="dark:text-typography-2 font-light tracking-widest text-sm">
                            Unpaid Order
                        </p>
                    </div>
                </div>
                <div
                    class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                    <div
                        class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                        <i
                            class="fa-solid fa-arrow-right-arrow-left dark:text-white text-2xl"></i>
                    </div>
                    <div
                        class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">
                            {{ data.processing_order }}
                        </p>
                        <p
                            class="dark:text-typography-2 font-light tracking-widest text-sm">
                            Processing Order
                        </p>
                    </div>
                </div>
                <div
                    class="h-28 rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 dashItem flex items-center gap-4 px-4">
                    <div
                        class="rounded-full bg-dark-primary-1 w-14 h-14 flex items-center justify-center flex-none">
                        <i
                            class="fa-solid fa-arrow-right-arrow-left dark:text-white text-2xl"></i>
                    </div>
                    <div
                        class="flex justify-center flex-col items-center w-full">
                        <p class="dark:text-white text-3xl font-normal">
                            {{ data.success_order }}
                        </p>
                        <p
                            class="dark:text-typography-2 font-light tracking-widest text-sm">
                            Success Order
                        </p>
                    </div>
                </div>
            </div>
            <!-- <div class="grid grid-cols-3 gap-4">
                <div
                    class="h-full w-full rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3"></div>
                <DomainChart />
                <div
                    class="h-full w-full rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3"></div>
            </div> -->
        </div>
    </AdminLayout>
</template>
