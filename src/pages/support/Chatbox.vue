<script setup>
import { ref, onMounted, onBeforeMount, nextTick } from 'vue'
import { useUsers } from '@/stores/auth'
import axios from '@/lib/axios.js'
import Pusher from 'pusher-js'
import SupportLayout from '@/layouts/SupportLayout.vue'
import { userStore } from '@/stores/user'

const auth = useUsers()
const storeUser = userStore()

const selectedUser = ref()
const messages = ref([])
const users = ref([])
const newMessage = ref('')
const chatMessagesRef = ref(null)
var pusher = new Pusher('511534a0c376ec5d7819', {
    cluster: 'mt1',
})
var channel = pusher.subscribe('chat')
channel.bind('App\\Events\\MessageSent', function (data) {
    if (data.message.sender_id !== auth.userData.id) {
        messages.value.push(data.message)
    }
})

const sendMessage = () => {
    const formData = new FormData()
    formData.append('message', newMessage.value)
    formData.append('sender_id', auth.userData.id)
    formData.append('receiver_id', selectedUser.value.id)
    if (newMessage.value.trim() !== '') {
        axios.post(`/api/messages/user/`, formData).then(response => {
            messages.value.push(response.data)
            newMessage.value = ''
        })
    }
}
const scrollToBottom = () => {
    nextTick(() => {
        if (chatMessagesRef.value) {
            chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
        }
    })
}

const formatTimestamp = timestamp => {
    const date = new Date(timestamp)
    return `${date.getHours()}:${date.getMinutes()}`
}
onBeforeMount(() => {
    if (!auth.hasUserData) {
        auth.getData()
    }
})
const onSelectUser = async () => {
    axios.get(`/api/messages/user/${selectedUser.value.id}`).then(response => {
        messages.value = response.data
        scrollToBottom()
    })
}

onMounted(async () => {
    await storeUser.getData()
    fetchUser()
})
async function fetchUser() {
    users.value = storeUser.users.filter(user => user.role == 'user')
}
</script>

<template>
    <SupportLayout title="Chat">
        <div class="w-full flex gap-3">
            <div
                class="w-full max-w-xs bg-light-primary-1 dark:bg-dark-primary-2 rounded-lg shadow-lg p-5 space-y-5">
                <div v-for="(user, index) in users" :key="index" class="w-full">
                    <input
                        class="peer hidden"
                        type="radio"
                        @change="onSelectUser"
                        name="selectedUser"
                        v-model="selectedUser"
                        :value="user"
                        :id="'selectUser' + user.id" />
                    <label
                        :for="'selectUser' + user.id"
                        class="border-y p-3 w-full block peer-checked:bg-gray-100 dark:peer-checked:bg-dark-primary-1 rounded-lg dark:text-white">
                        {{ user.name }}
                    </label>
                </div>
            </div>
            <div
                class="p-3 h-full w-full bg-light-primary-1 dark:bg-dark-primary-2 rounded-lg shadow-lg space-y-2">
                <div
                    class="chat-messages flex flex-col items-start gap-1 p-4 overflow-y-scroll h-[70vh] invisible-scrollbar"
                    ref="chatMessagesRef">
                    <div
                        v-for="(message, index) in messages"
                        :key="index"
                        :class="
                            auth.userData.id == message.sender_id
                                ? 'text-start self-end bg-[#005c4b]'
                                : 'text-end self-start bg-[#353535]'
                        "
                        class="text-white px-3 py-2 rounded-lg max-w-2xl">
                        <div class="flex gap-1">
                            <p>
                                {{ message.text }}
                            </p>
                            <span
                                class="text-[10px] text-gray-200 ml-3 self-end"
                                >{{ formatTimestamp(message.created_at) }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="w-full" v-if="selectedUser">
                    <div class="flex items-center w-full gap-3">
                        <input
                            class="w-full rounded-lg bg-gray-200 dark:bg-dark-primary-1 dark:text-typography-1 shadow-lg"
                            v-model="newMessage"
                            @keyup.enter="sendMessage"
                            placeholder="Type a message..." />
                        <button
                            @click="sendMessage"
                            class="p-3 rounded-lg break-words flex items-center justify-center bg-[#005c4b] text-typography-1 h-full">
                            <i class="fa-solid fa-paper-plane-top"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </SupportLayout>
</template>
