<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { todoListStore } from '@/stores/todolist'

const route = useRoute()
const store = todoListStore()
const todos = ref([])
const userId = route.params.user
const headers = [
    { key: 'note', title: 'id' },
    { key: 'created_at', title: 'Task Date' },
    { key: 'submit_at', title: 'Submited Date' },
]
onMounted(async () => {
    await store.getDataByUserId(userId)
    fetchTodos()
})
const fetchTodos = async () => {
    todos.value = store.todolists.filter(item => {
        return item.status == 'submited'
    })
}
</script>
<template>
    <AdminLayout title="Todo List Report">
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <v-data-table
                :headers="headers"
                :items="todos"
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
            </v-data-table>
        </div>
    </AdminLayout>
</template>
