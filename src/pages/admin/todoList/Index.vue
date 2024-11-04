<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import { todoListStore } from '@/stores/todolist'
import ValidationErrors from '@/components/ValidationErrors.vue'

import { ref, onMounted, computed, watchEffect } from 'vue'
import '@/assets/css/vuetify.css'

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const store = todoListStore()
const filterUser = ref()
const tab = ref(null)
const form = ref({
    newTodo: null,
})
const data = ref({
    user: [],
    todos: [],
    selectedTodo: [],
})
onMounted(async () => {
    await store.getDataIndex()
    data.value.user = store.index.user
    fetchTodos()
})
const fetchTodos = async () => {
    data.value.todos = store.index.todo
}
const createTodo = async () => {
    const formData = new FormData()
    formData.append('note', form.value.newTodo)
    formData.append('user_id', filterUser.value.id)
    await store.addData(formData, setErrors, processing)
}
watchEffect(() => {
    fetchTodos()
})
</script>

<template>
    <AdminLayout title="Todo List">
        <ValidationErrors class="w-full" :errors="errors" />

        <div class="w-full space-y-4">
            <div
                class="dark:bg-dark-primary-2 bg-light-primary-1 p-3 rounded-lg shadow-lg">
                <div class="flex justify-between items-center gap-10">
                    <multiselect
                        v-model="filterUser"
                        :options="data?.user"
                        :searchable="true"
                        :close-on-select="true"
                        label="name"
                        :taggable="true"
                        track-by="name"
                        :preserve-search="true"
                        placeholder="Select User"></multiselect>
                </div>
            </div>
            <div
                class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-1 shadow-lg dark:shadow-typography-3 gap-4 border">
                <div
                    class="dark:bg-dark-primary-2 bg-light-primary-2 dark:text-typography-1 rounded-t-lg px-3 !text-xs">
                    <div class="flex justify-between items-center">
                        <v-tabs
                            v-model="tab"
                            align-tabs="start"
                            color="deep-purple-accent-4">
                            <v-tab value="todo" class="!text-sm !capitalize"
                                >Todo</v-tab
                            >
                            <v-tab value="doing" class="!text-sm !capitalize"
                                >Doing</v-tab
                            >
                            <v-tab value="done" class="!text-sm !capitalize"
                                >Done</v-tab
                            >
                        </v-tabs>
                        <div class="w-10 flex justify-center">
                            <v-menu v-if="filterUser">
                                <template v-slot:activator="{ props }">
                                    <button v-bind="props">
                                        <i
                                            class="fa-solid fa-ellipsis text-3xl dark:text-light-primary-1"></i>
                                    </button>
                                </template>
                                <ul
                                    class="bg-light-primary-1 rounded-lg p-3 space-y-1 text-sm">
                                    <li class="">
                                        <v-dialog max-width="500">
                                            <template
                                                v-slot:activator="{
                                                    props: activatorProps,
                                                }">
                                                <button
                                                    v-bind="activatorProps"
                                                    class="px-2 py-1 !bg-light-primary-1 hover:!bg-gray-100 rounded-lg w-full block">
                                                    Add Task for
                                                    {{ filterUser.name }}
                                                </button>
                                            </template>

                                            <template
                                                v-slot:default="{ isActive }">
                                                <v-card
                                                    :title="
                                                        'Add Task for ' +
                                                        filterUser.name
                                                    ">
                                                    <v-card-text
                                                        class="space-y-3">
                                                        <form
                                                            @submit.prevent="
                                                                createTodo
                                                            ">
                                                            <textarea
                                                                v-model="
                                                                    form.newTodo
                                                                "
                                                                type="text"
                                                                class="rounded-lg w-full border !border-black"></textarea>
                                                            <button
                                                                type="submit"
                                                                class="rounded-lg bg-secondary-3 px-5 py-1 !text-typography-1 hover:bg-opacity-80 flex items-center">
                                                                <p>Save</p>
                                                                <svg
                                                                    v-if="
                                                                        processing
                                                                    "
                                                                    role="status"
                                                                    class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                                            </button>
                                                        </form>
                                                    </v-card-text>
                                                </v-card>
                                            </template>
                                        </v-dialog>
                                    </li>
                                    <li class="">
                                        <router-link
                                            :to="{
                                                name: 'todolist.report',
                                                params: {
                                                    user: filterUser.id,
                                                },
                                            }"
                                            class="px-2 py-1 !bg-light-primary-1 hover:!bg-gray-100 rounded-lg w-full block"
                                            >Report Todo List</router-link
                                        >
                                    </li>
                                </ul>
                            </v-menu>
                        </div>
                    </div>
                </div>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="todo">
                        <div class="p-4">
                            <ul
                                class="space-y-4 h-[calc(100vh-180px)] overflow-y-scroll invisible-scrollbar bg-hexagon">
                                <li
                                    v-for="(item, index) in (
                                        filterUser?.todos || []
                                    ).filter(todo => todo.status === 'todo')"
                                    :key="index">
                                    <div
                                        class="dark:text-light-primary-1 p-3 text-sm bg-light-primary-2 dark:bg-dark-primary-2 rounded-lg shadow-lg">
                                        {{ item?.note }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="doing">
                        <div class="p-4">
                            <ul
                                class="space-y-4 h-[calc(100vh-180px)] overflow-y-scroll invisible-scrollbar bg-hexagon">
                                <li
                                    v-for="(item, index) in (
                                        filterUser?.todos || []
                                    ).filter(todo => todo.status === 'doing')"
                                    :key="index">
                                    <div
                                        class="dark:text-light-primary-1 p-3 text-sm bg-light-primary-2 dark:bg-dark-primary-2 rounded-lg shadow-lg">
                                        {{ item?.note }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="done">
                        <div class="p-4">
                            <ul
                                class="space-y-4 h-[calc(100vh-180px)] overflow-y-scroll invisible-scrollbar bg-hexagon">
                                <li
                                    v-for="(item, index) in (
                                        filterUser?.todos || []
                                    ).filter(todo => todo.status === 'done')"
                                    :key="index">
                                    <div
                                        class="dark:text-light-primary-1 p-3 text-sm bg-light-primary-2 dark:bg-dark-primary-2 rounded-lg shadow-lg">
                                        {{ item?.note }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
        </div>
    </AdminLayout>
</template>
