<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, ref, computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import '@/assets/css/vuetify.css'
import { templateStore } from '@/stores/template'

const store = templateStore()
const templates = ref([])
const processing = ref(false)
const backendUrl = ref(import.meta.env.VITE_PUBLIC_BACKEND_URL)

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const headers = [
    { key: 'template_name', title: 'Template Name' },
    { key: 'id', title: 'Action', align: 'center' },
]
const filtered = computed(() => {
    return templates.value.filter(template => {
        return template.template_name.toLowerCase().includes(search.value)
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
    templates.value = store.templates
}

const deleteData = async id => {
    await store.deleteData(id, processing)
}
watchEffect(() => {
    fetchData()
})
</script>

<template>
    <AdminLayout title="List Of Templates">
        <div class="w-full">
            <div class="relative">
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="flex justify-between items-center">
                        <RouterLink :to="{ name: 'admin.template.create' }">
                            <div
                                class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                                <i class="fa-solid fa-plus"></i>
                                <p>Add Template</p>
                            </div>
                        </RouterLink>
                        <input
                            type="text"
                            v-model="search"
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            placeholder="Search Template" />
                    </div>
                    <v-data-table
                        v-model:page="page"
                        :search="search"
                        :headers="headers"
                        :items="templates"
                        hide-default-footer
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }"
                        item-key="id"
                        class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                        <template v-slot:item.template_name="{ item }">
                            <a :href="item.template_url" target="_blank">
                                <div
                                    class="flex flex-col gap-1 items-center py-3">
                                    <img
                                        :src="
                                            backendUrl +
                                            '/storage/images/template/' +
                                            item.template_image
                                        "
                                        class="h-40 rounded-lg"
                                        alt="" />
                                    <p>{{ item.template_name }}</p>
                                </div>
                            </a>
                        </template>
                        <template v-slot:item.id="{ item }">
                            <div
                                class="flex gap-3 items-center justify-center text-xs">
                                <router-link
                                    :to="{
                                        name: 'admin.template.edit',
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
                                    :type="'Template'"
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
