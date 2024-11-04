<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { domainStore } from '@/stores/domain'
import { onMounted, ref, computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import '@/assets/css/vuetify.css'

const store = domainStore()
const domains = ref([])
const processing = ref(false)
const setErrors = ref([])
const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const headers = [
    { key: 'domain_name', title: 'Product Name' },
    { key: 'user', title: 'Owner' },
    { key: 'start_date', title: 'Start Date' },
    { key: 'expired_date', title: 'Expired Date' },
    { key: 'id', title: 'Action', align: 'center' },
]
const filtered = computed(() => {
    return domains.value.filter(domain => {
        return domain.domain_name.toLowerCase().includes(search.value)
    })
})
const pageCount = computed(() => {
    return Math.ceil(filtered.value.length / itemsPerPage.value)
})

onMounted(async () => {
    await store.getData()
    fetchData()
})
async function fetchData() {
    domains.value = store.domains
}

const deleteData = async id => {
    await store.deleteData(id, processing)
}
watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AdminLayout title="List Of Domains">
        <div class="w-full">
            <div class="relative">
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="flex justify-between items-center">
                        <RouterLink :to="{ name: 'domain.create' }">
                            <div
                                class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                                <i class="fa-solid fa-plus"></i>
                                <p>Add Domain</p>
                            </div>
                        </RouterLink>
                        <input
                            type="text"
                            v-model="search"
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            placeholder="Search Domain" />
                    </div>
                    <v-data-table
                        v-model:page="page"
                        :search="search"
                        :headers="headers"
                        :items="domains"
                        hide-default-footer
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }"
                        item-key="id"
                        class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                        <template v-slot:item.name="{ item }">
                            <div class="grid grid-cols-1 py-2">
                                <p class="line-clamp-2">{{ item.name }}</p>
                            </div>
                        </template>
                        <template v-slot:item.user="{ item }">
                            <div class="py-2">
                                <p class="">{{ item.user?.name }}</p>
                            </div>
                        </template>
                        <template v-slot:item.id="{ item }">
                            <div
                                class="flex gap-3 items-center justify-center text-xs">
                                <router-link
                                    :to="{
                                        name: 'domain.edit',
                                        params: {
                                            id: item.id,
                                        },
                                    }">
                                    <div
                                        class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                        <i class="fa-solid fa-pen"></i>
                                        <p>Edit</p>
                                    </div>
                                </router-link>
                                <ConfirmDelete
                                    :type="'Domain'"
                                    :id="item.id"
                                    :method="deleteData"></ConfirmDelete>
                            </div>
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
