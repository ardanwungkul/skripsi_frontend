<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import { onBeforeMount, ref } from 'vue'
import { orderStore } from '@/stores/order'
import { useRoute, useRouter } from 'vue-router'

const isLoading = ref(true)
const processing = ref(false)
const storeOrder = orderStore()
const order = ref()
const router = useRouter()
const route = useRoute()
const code = ref(route.params.code)
onBeforeMount(async () => {
    await storeOrder.getDataByCode(code.value)
    order.value = storeOrder.order
    isLoading.value = false
})
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const payButton = async () => {
    processing.value = true
    const formData = new FormData()
    formData.append('order_id', order.value.id)
    formData.append('return', window.location.href)
    await storeOrder.payment(formData, processing)

    processing.value = false
}
</script>
<template>
    <UserLayout>
        <LoadingAdmin :isLoading="isLoading" />
        <div class="pt-28 pb-20 max-w-6xl mx-auto w-full" v-if="order">
            <div class="max-w-2xl mx-auto w-full">
                <fieldset
                    class="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-400 col-span-2 relative">
                    <legend
                        class="rounded-lg border px-10 py-1 ml-3 bg-[#ff9800] text-white text-sm">
                        Detail Order
                    </legend>
                    <svg
                        v-if="processing"
                        role="status"
                        class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 absolute top-3 right-3"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <div class="space-y-3">
                        <div
                            v-if="order.status_payment == 'PAID'"
                            class="flex justify-end">
                            <p
                                class="text-center text-sm bg-green-400 text-green-800 px-5 py-1 rounded-lg bg-opacity-50">
                                Pembayaran Berhasil Dilakukan
                            </p>
                        </div>
                        <div class="flex justify-between px-3">
                            <div class="grid">
                                <p class="text-xs line-clamp-1">Nama Domain</p>
                            </div>
                            <p class="text-xs whitespace-nowrap">
                                {{ order.domain_name }}
                            </p>
                        </div>
                        <div class="flex justify-between px-3">
                            <div class="grid">
                                <p class="text-xs line-clamp-1">
                                    Nama Template
                                </p>
                            </div>
                            <p class="text-xs whitespace-nowrap">
                                {{ order.template.template_name }}
                            </p>
                        </div>
                        <div class="flex justify-between px-3">
                            <div class="grid">
                                <p class="text-xs line-clamp-1">
                                    {{ order.package.package_name }}
                                </p>
                            </div>
                            <p class="text-xs whitespace-nowrap">
                                Rp.
                                <span>
                                    {{
                                        formatPrice(order.package.package_price)
                                    }}
                                </span>
                            </p>
                        </div>

                        <div class="flex justify-between px-3">
                            <div class="grid">
                                <p class="text-xs line-clamp-1">PPN 11%</p>
                            </div>
                            <p class="text-xs whitespace-nowrap">
                                Rp.
                                <span>{{
                                    formatPrice(
                                        order.package.package_price +
                                            (order.package.package_price * 11) /
                                                100,
                                    )
                                }}</span>
                            </p>
                        </div>
                        <div
                            class="bg-[#ff9800] px-3 text-sm flex justify-between py-1 items-center rounded-lg">
                            <p class="text-white">Total</p>
                            <p class="text-xs whitespace-nowrap text-white">
                                Rp.
                                <span>{{ formatPrice(order?.amount) }}</span>
                            </p>
                        </div>
                        <button
                            @click="payButton"
                            v-if="order.status_payment !== 'PAID'"
                            class="bg-[#0A1B65] hover:bg-opacity-90 py-1 px-3 w-full rounded-lg text-white text-sm">
                            <p>Bayar Sekarang</p>
                        </button>
                    </div>
                </fieldset>
            </div>
        </div>
    </UserLayout>
</template>
