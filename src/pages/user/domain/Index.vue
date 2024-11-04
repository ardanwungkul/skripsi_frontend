<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { useUsers } from '@/stores/auth'
import { onBeforeMount, onMounted, ref } from 'vue'
import { userStore } from '@/stores/user'
import { orderStore } from '@/stores/order'

onBeforeMount(() => {
    if (!auth.hasUserData) {
        auth.getData()
    }
})
onMounted(async () => {
    await store.getDataById(auth.userData.id)
    await storeOrder.getDataByUserId(auth.userData.id)
    domains.value = store.user.domain
    orderDomains.value = storeOrder.orders.filter(
        order => order.status_order == 'PROCESSING',
    )
})
const auth = useUsers()
const store = userStore()
const storeOrder = orderStore()
const domains = ref([])
const orderDomains = ref([])
</script>
<template>
    <UserLayout>
        <div class="pt-28 pb-20 max-w-6xl mx-auto space-y-3">
            <div class="bg-white rounded-lg p-5">
                <p class="text-2xl mb-3 font-bold">Domain Saya</p>
                <div class="grid grid-cols-3 gap-3">
                    <div
                        v-for="(domain, index) in domains"
                        v-if="domains.length > 0"
                        :key="index"
                        class="bg-light-primary-2 rounded-lg p-5 shadow-lg">
                        <p class="text-lg font-semibold">
                            {{ domain.domain_name }}
                        </p>
                        <div class="flex items-center justify-between">
                            <p>Tanggal Mulai</p>
                            <p>{{ domain.start_date }}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <p>Tanggal Expired</p>
                            <p>{{ domain.expired_date }}</p>
                        </div>
                    </div>
                    <div
                        v-else
                        class="col-span-3 flex items-center justify-center bg-light-primary-2 py-2">
                        <p>Anda Tidak Memiliki Domain</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg p-5">
                <p class="text-2xl mb-3 font-bold">
                    Domain Yang Sedang Dikerjakan
                </p>
                <div class="grid grid-cols-3 gap-3">
                    <div
                        v-for="(domain, index) in orderDomains"
                        v-if="orderDomains.length > 0"
                        :key="index"
                        class="bg-light-primary-2 rounded-lg p-5 shadow-lg">
                        <p class="text-lg font-semibold">
                            {{ domain.domain_name }}
                        </p>
                        <div class="flex items-center justify-between">
                            <p>Template</p>
                            <p>{{ domain.template.template_name }}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <p>Paket</p>
                            <p>{{ domain.package.package_name }}</p>
                        </div>
                    </div>
                    <div
                        v-else
                        class="col-span-3 flex items-center justify-center bg-light-primary-2 py-2">
                        <p>Anda Tidak Memiliki Domain</p>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>
