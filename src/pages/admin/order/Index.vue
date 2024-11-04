<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, ref, computed, watchEffect } from 'vue'
import '@/assets/css/vuetify.css'
import { orderStore } from '@/stores/order'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import { userStore } from '@/stores/user'

const store = orderStore()
const storeUser = userStore()
const orders = ref([])
const users = ref([])
const selectedUser = ref(null)
const processing = ref(false)

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const headers = [
    { key: 'order_code', title: 'Order Code' },
    { key: 'user.name', title: 'User Name' },
    { key: 'domain_name', title: 'Domain Name' },
    { key: 'amount', title: 'Amount' },
    { key: 'status_payment', title: 'Status Payment' },
    { key: 'status_order', title: 'Status Order' },
    { key: 'id', title: 'Action' },
]
const filtered = computed(() => {
    return orders.value.filter(order => {
        return order.order_code.toLowerCase().includes(search.value)
    })
})
const pageCount = computed(() => {
    return Math.ceil(filtered.value.length / itemsPerPage.value)
})

onMounted(async () => {
    await store.getData()
    await storeUser.getData()
    users.value = storeUser.users.filter(user => {
        return user.role == 'support'
    })
    fetchData()
})
async function fetchData() {
    orders.value = store.orders
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const proccessOrder = async item => {
    const formData = new FormData()
    formData.append('order_id', item.id)
    formData.append('user_id', selectedUser.value.id)
    await store.process(formData, processing)
}

watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AdminLayout title="List Of Orders">
        <div class="w-full">
            <div class="relative">
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="flex justify-between items-center">
                        <input
                            type="text"
                            v-model="search"
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            placeholder="Search Order" />
                    </div>
                    <v-data-table
                        v-model:page="page"
                        :search="search"
                        :headers="headers"
                        :items="orders"
                        hide-default-footer
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }"
                        item-key="id"
                        class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                        <template v-slot:item.amount="{ item }">
                            <p class="whitespace-nowrap">
                                Rp. {{ formatPrice(item.amount) }}
                            </p>
                        </template>
                        <template v-slot:item.id="{ item }">
                            <v-dialog
                                max-width="500"
                                v-if="
                                    item.status_payment == 'PAID' &&
                                    item.status_order == 'PENDING'
                                ">
                                <template
                                    v-slot:activator="{
                                        props: activatorProps,
                                    }">
                                    <button
                                        v-bind="activatorProps"
                                        class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                        <p>Progress</p>
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Give this Assignment to">
                                        <div class="p-3 space-y-3">
                                            <multiselect
                                                v-model="selectedUser"
                                                :options="users"
                                                :searchable="true"
                                                :close-on-select="true"
                                                label="name"
                                                track-by="name"
                                                :preserve-search="true"
                                                placeholder="Select User"></multiselect>
                                            <button
                                                @click="proccessOrder(item)"
                                                class="bg-secondary-3 px-5 py-1 rounded-lg text-typography-1 shadow-lg hover:bg-opacity-80">
                                                Process
                                            </button>
                                        </div>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </template>
                    </v-data-table>
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                        :next-icon="'fa-solid fa-chevron-right'"
                        :prev-icon="'fa-solid fa-chevron-left'"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
