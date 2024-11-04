<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useUsers } from '@/stores/auth'
import { orderStore } from '@/stores/order'
import { format } from 'date-fns'
const isLoading = ref(true)
const auth = useUsers()
const storeOrder = orderStore()
const order = ref([])
onBeforeMount(() => {
    if (!auth.hasUserData) {
        auth.getData()
    }
})
onMounted(async () => {
    await storeOrder.getDataByUserId(auth.userData.id)
    order.value = storeOrder.orders
    isLoading.value = false
})
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
function formatDate(dates) {
    const date = new Date(dates)
    return format(date, 'dd MMM yyyy')
}
</script>
<template>
    <UserLayout>
        <LoadingAdmin :isLoading="isLoading" />
        <div class="pt-28 pb-20 max-w-6xl mx-auto w-full">
            <ul class="space-y-4">
                <li v-for="(item, index) in order" :key="index">
                    <div class="bg-white rounded-lg p-5 shadow-lg">
                        <div
                            class="flex justify-between border-b mb-2 pb-2 items-center">
                            <div>
                                <p class="text-lg">
                                    Order Website
                                    <span class="font-bold">{{
                                        item.domain_name
                                    }}</span>
                                </p>
                                <p class="text-xs text-gray-500">
                                    {{ formatDate(item.created_at) }}
                                </p>
                            </div>
                            <p
                                :class="
                                    item.status_payment == 'PAID'
                                        ? 'text-green-500'
                                        : 'text-gray-300'
                                "
                                class="py-1 text-sm">
                                {{
                                    item.status_payment == 'SUBMIT'
                                        ? 'BELUM MELAKUKAN PEMBAYARAN'
                                        : item.status_payment
                                }}
                            </p>
                        </div>
                        <div class="text-sm">
                            <div class="flex justify-between">
                                <p>Nama Paket</p>
                                <p>{{ item.package.package_name }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p>Nama Template</p>
                                <p>{{ item.template.template_name }}</p>
                            </div>
                        </div>
                        <div
                            class="flex justify-between border-t pt-2 mt-2 items-end">
                            <p class="text-lg font-bold">
                                Rp. {{ formatPrice(item.amount) }}
                            </p>
                            <router-link
                                :to="{
                                    name: 'user.order.checkout',
                                    params: {
                                        code: item.order_code,
                                    },
                                }"
                                v-if="item.status_payment !== 'PAID'"
                                class="bg-[#ff9800] text-white rounded-lg px-5 py-1"
                                >Bayar</router-link
                            >
                            <router-link
                                :to="{
                                    name: 'user.order.checkout',
                                    params: {
                                        code: item.order_code,
                                    },
                                }"
                                v-else
                                class="bg-[#ff9800] text-white rounded-lg px-5 py-1"
                                >Lihat Transaksi</router-link
                            >
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </UserLayout>
</template>
