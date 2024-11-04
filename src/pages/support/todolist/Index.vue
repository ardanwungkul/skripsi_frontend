<script setup>
import SupportLayout from '@/layouts/SupportLayout.vue'
import { todoListStore } from '@/stores/todolist'
import { useUsers } from '@/stores/auth'
import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import '@/assets/css/vuetify.css'
import draggable from 'vuedraggable'
import ValidationErrors from '@/components/ValidationErrors.vue'
import ConfirmOrder from '@/components/dialog/ConfirmOrder.vue'
import { debounce } from 'lodash'

const store = todoListStore()
const useUser = useUsers()
const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const todos = ref({
    todo: [],
    doing: [],
    done: [],
})

const newTask = ref([])

onBeforeMount(() => {
    if (!useUser.hasUserData) {
        useUser.getData()
    }
})

const id = computed(() => useUser.userData.id)
onMounted(async () => {
    await store.getDataByUserId(id.value)

    fetchData()
})

const fetchData = async () => {
    todos.value.todo = store.todolists.filter(todo => todo.status == 'todo')
    todos.value.doing = store.todolists.filter(todo => todo.status == 'doing')
    todos.value.done = store.todolists.filter(todo => todo.status == 'done')
}
const onDragEnd = async event => {
    const status = event.to.dataset.status
    const statusFrom = event.from.dataset.status
    const idFrom = event.item.dataset.id

    if (status !== statusFrom) {
        processing.value = true
        const formData = new FormData()
        formData.append('id', idFrom)
        formData.append('status', status)
        await store.editStatus(formData, processing)
    }
}

const editNote = async (note, idFrom) => {
    if (note !== '') {
        processing.value = true
        const formData = new FormData()
        formData.append('note', note)
        formData.append('id', idFrom)
        await store.editNote(formData, processing)
    }
}
const addTask = async () => {
    processing.value = true
    const formData = new FormData()
    formData.append('user_id', id.value)
    formData.append('note', newTask.value)
    await store.addData(formData, setErrors, processing)
    newTask.value = ''
}
const deleteTask = async id => {
    processing.value = true
    await store.deleteData(id, processing)
}
const debouncedEditNote = debounce(editNote, 500)
const submitTodo = async () => {
    const formData = new FormData()
    todos.value.done.forEach(item => {
        if (!item.order_id) {
            formData.append('todo[]', item.id)
        }
    })
    await store.submitTodo(formData, setErrors, processing)
}
const confirmOrder = async (form, processing) => {
    await store.confirmOrder(form, setErrors, processing)
}

watchEffect(() => {
    fetchData()
})
</script>
<template>
    <SupportLayout title="Todo List" :processing="processing">
        <ValidationErrors class="w-full" :errors="errors" />
        <div>
            <div class="grid grid-cols-3 p-4 gap-4">
                <div v-for="(items, status) in todos" :key="status">
                    <fieldset
                        class="rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 gap-4 p-4 bg-hexagon border dark:border-typography-2">
                        <legend
                            class="dark:bg-dark-primary-1 bg-light-primary-1 border dark:!border-typography-2 rounded-lg px-10 py-1 dark:text-typography-1 text-sm capitalize"
                            align="center">
                            {{ status }}
                        </legend>
                        <div
                            v-if="status == 'todo'"
                            class="mb-4 border rounded-lg overflow-hidden dark:bg-dark-primary-1 bg-light-primary-2">
                            <form @submit.prevent="addTask">
                                <div
                                    class="move border-b dark:!border-typography-2 p-3 flex justify-between items-center">
                                    <p class="dark:text-typography-1 text-sm">
                                        Add New Task
                                    </p>
                                    <button class="text-secondary-3">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                </div>
                                <v-textarea
                                    v-model="newTask"
                                    :draggable="false"
                                    rows="1"
                                    :required="true"
                                    bg-color="transparent"
                                    hide-details="true"
                                    placeholder="Create New Task"
                                    class="dark:!text-typography-1 !bg-light-primary-1 dark:!bg-dark-primary-1 rounded-lg"
                                    auto-grow />
                            </form>
                        </div>
                        <draggable
                            v-model="todos[status]"
                            group="tasks"
                            item-key="id"
                            class="space-y-4"
                            :data-status="status"
                            @end="onDragEnd">
                            <template #item="{ element }">
                                <div
                                    v-if="!element.order_id"
                                    :class="
                                        element.note == ''
                                            ? 'shadow-md shadow-red-500'
                                            : ''
                                    "
                                    class="list-group-item dark:bg-dark-primary-1 bg-light-primary-2 rounded-lg border overflow-hidden !cursor-move"
                                    :draggable="true"
                                    :data-id="element.id">
                                    <div
                                        class="move border-b dark:!border-typography-2 p-3 flex justify-end">
                                        <div class="flex gap-3 items-center">
                                            <button
                                                @click="deleteTask(element.id)">
                                                <i
                                                    class="text-red-500 fa-trash fa-regular"></i>
                                            </button>
                                            <i
                                                class="dark:text-typography-1 fa-arrows-up-down-left-right fa-regular">
                                            </i>
                                        </div>
                                    </div>

                                    <v-textarea
                                        :draggable="false"
                                        rows="1"
                                        bg-color="transparent"
                                        hide-details="true"
                                        class="dark:!text-typography-1 !bg-light-primary-1 dark:!bg-dark-primary-1"
                                        v-model="element.note"
                                        @input="
                                            debouncedEditNote(
                                                element.note,
                                                element.id,
                                            )
                                        "
                                        auto-grow />
                                </div>
                                <div
                                    v-else
                                    :class="
                                        element.note == ''
                                            ? 'shadow-md shadow-red-500'
                                            : ''
                                    "
                                    class="list-group-item dark:bg-dark-primary-1 bg-light-primary-2 rounded-lg border !border-secondary-3 overflow-hidden !cursor-move"
                                    :draggable="true"
                                    :data-id="element.id">
                                    <div
                                        class="move border-b !border-secondary-3 p-3 flex justify-end">
                                        <div class="flex gap-3 items-center">
                                            <i
                                                class="dark:text-typography-1 fa-arrows-up-down-left-right fa-regular">
                                            </i>
                                        </div>
                                    </div>
                                    <div
                                        class="p-3 dark:text-typography-1 space-y-2">
                                        <p class="text-center text-sm">
                                            Order Website
                                            {{ element.order.user.name }}
                                        </p>
                                        <div class="">
                                            <p>
                                                {{
                                                    element.order.template
                                                        .template_name
                                                }}
                                            </p>
                                            <p>
                                                {{
                                                    element.order.package
                                                        .package_name
                                                }}
                                            </p>
                                        </div>
                                        <ConfirmOrder
                                            :todolist="element"
                                            :order="element.order"
                                            :method="confirmOrder" />
                                    </div>
                                    <!-- <v-textarea
                                        :draggable="false"
                                        disabled=""
                                        rows="1"
                                        bg-color="transparent"
                                        hide-details="true"
                                        class="dark:!text-typography-1 !bg-light-primary-1 dark:!bg-dark-primary-1"
                                        v-model="element.note"
                                        @input="
                                            debouncedEditNote(
                                                element.note,
                                                element.id,
                                            )
                                        "
                                        auto-grow /> -->
                                </div>
                            </template>
                        </draggable>
                        <button
                            @click="submitTodo"
                            v-if="status == 'done'"
                            class="bg-secondary-3 rounded-lg text-white py-1 mt-3 text-center w-full hover:bg-opacity-80">
                            Submit
                        </button>
                    </fieldset>
                </div>
            </div>
        </div>
    </SupportLayout>
</template>
