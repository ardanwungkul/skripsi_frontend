<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { vendorStore } from '@/stores/vendor'
import { onMounted, ref, computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import '@/assets/css/vuetify.css'
import AddVendor from '@/components/dialog/AddVendor.vue'
import EditVendor from '@/components/dialog/EditVendor.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const store = vendorStore()
const vendors = ref([])
const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const headers = [
    { key: 'vendor_name', title: 'Vendor Name' },
    { key: 'id', title: 'Action', align: 'center' },
]
const filtered = computed(() => {
    return vendors.value.filter(vendor => {
        return vendor.vendor_name.toLowerCase().includes(search.value)
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
    vendors.value = store.vendors
}

const addData = async form => {
    await store.addData(form, setErrors, processing)
}
const editData = async (form, id) => {
    await store.editData(form, setErrors, processing, id)
}
const deleteData = async id => {
    await store.deleteData(id, processing)
}
watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AdminLayout title="List Of Vendors">
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="w-full">
            <div class="relative">
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="flex justify-between items-center">
                        <AddVendor :method="addData" />
                        <input
                            type="text"
                            v-model="search"
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            placeholder="Search Vendor" />
                    </div>
                    <v-data-table
                        v-model:page="page"
                        :search="search"
                        :headers="headers"
                        :items="vendors"
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
                        <template v-slot:item.id="{ item }">
                            <div
                                class="flex gap-3 items-center justify-center text-xs">
                                <EditVendor :method="editData" :vendor="item" />
                                <ConfirmDelete
                                    :type="'Vendor'"
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
