<script setup>
import { ref, onMounted, onBeforeMount, nextTick } from 'vue'
import { useUsers } from '@/stores/auth'
import axios from '@/lib/axios.js'
import Pusher from 'pusher-js'
import UserLayout from '@/layouts/UserLayout.vue'

const store = useUsers()

// Reactive references
const messages = ref([])
const newMessage = ref('')
const chatMessagesRef = ref(null)
var pusher = new Pusher('511534a0c376ec5d7819', {
    cluster: 'mt1',
})
var channel = pusher.subscribe('chat')
channel.bind('App\\Events\\MessageSent', function (data) {
    if (data.message.sender_id !== store.userData.id) {
        messages.value.push(data.message)
    }
})

const sendMessage = () => {
    const formData = new FormData()
    formData.append('message', newMessage.value)
    formData.append('sender_id', store.userData.id)
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
    if (!store.hasUserData) {
        store.getData()
    }
})

onMounted(async () => {
    axios.get(`/api/messages/user/${store.userData.id}`).then(response => {
        messages.value = response.data
        scrollToBottom()
    })
})
</script>

<template>
    <UserLayout>
        <div class="pt-28 pb-20 max-w-6xl mx-auto w-full">
            <div
                class="border p-3 h-full bg-white rounded-lg shadow-lg space-y-2">
                <div
                    class="chat-messages flex flex-col items-start gap-1 p-4 overflow-y-scroll h-[70vh] invisible-scrollbar"
                    ref="chatMessagesRef">
                    <div
                        v-for="(message, index) in messages"
                        :key="index"
                        :class="
                            store.userData.id == message.sender_id
                                ? 'self-end bg-[#005c4b]'
                                : 'self-start bg-[#353535]'
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
                <div class="w-full">
                    <div class="flex items-center w-full gap-3">
                        <input
                            class="w-full rounded-lg bg-gray-200 shadow-lg"
                            v-model="newMessage"
                            @keyup.enter="sendMessage"
                            placeholder="Type a message..." />
                        <button
                            @click="sendMessage"
                            class="p-3 rounded-lg break-words flex items-center justify-center bg-[#005c4b] text-white h-full">
                            <i class="fa-solid fa-paper-plane-top"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>
