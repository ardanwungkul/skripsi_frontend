<script setup>
import { useUsers } from '@/stores/auth'
import Logo from '@/assets/images/jb-logo1.png'
import { onBeforeMount } from 'vue'

const store = useUsers()
const auth = store.authUser
onBeforeMount(() => {
    if (auth) {
        store.getData()
    }
})
const submitLogout = () => {
    store.logout()
}
</script>

<template>
    <nav class="h-16 w-full fixed top-5 px-5 z-20">
        <div
            class="max-w-6xl mx-auto w-full h-full bg-white rounded-lg shadow-lg border drop-shadow-lg">
            <div class="flex justify-between items-center px-3 h-full">
                <router-link :to="{ name: 'welcome' }" class="px-3 py-3">
                    <img :src="Logo" alt="" class="object-contain w-40" />
                </router-link>
                <div class="px-3 block">
                    <v-menu transition="slide-y-transition" v-if="auth">
                        <template v-slot:activator="{ props }">
                            <button
                                type="button"
                                v-bind="props"
                                class="flex items-center gap-3 px-5 py-2">
                                <p>
                                    {{ store.userData.name }}
                                </p>
                                <i class="fa-solid fa-chevron-down text-xs"></i>
                            </button>
                        </template>
                        <v-list class="!p-3 min-w-40">
                            <router-link
                                :to="{ name: 'user.order.index' }"
                                v-if="store.userData?.role == 'user'">
                                <div
                                    class="text-sm text-gray-700 px-3 py-3 hover:bg-light-primary-2 !w-full rounded-lg">
                                    Pesanan Saya
                                </div>
                            </router-link>
                            <router-link
                                :to="{ name: 'user.domain.index' }"
                                v-if="store.userData?.role == 'user'">
                                <div
                                    class="text-sm text-gray-700 px-3 py-3 hover:bg-light-primary-2 !w-full rounded-lg">
                                    Domain Saya
                                </div>
                            </router-link>
                            <router-link
                                :to="{ name: 'dashboard' }"
                                v-if="store.userData?.role !== 'user'">
                                <div
                                    class="text-sm text-gray-700 px-3 py-3 hover:bg-light-primary-2 !w-full rounded-lg">
                                    Dashboard
                                </div>
                            </router-link>
                            <button
                                @click="submitLogout"
                                type="button"
                                class="text-sm text-gray-700 px-3 py-3 hover:bg-light-primary-2 !w-full rounded-lg text-start">
                                Log Out
                            </button>
                        </v-list>
                    </v-menu>
                    <template v-else>
                        <router-link
                            :to="{ name: 'login' }"
                            class="px-5 py-2 uppercase tracking-widest font-medium text-sm rounded-lg text-white"
                            style="
                                background-image: linear-gradient(
                                    180deg,
                                    #ff9800 0%,
                                    #ff6e00 100%
                                );
                            ">
                            Login
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>
