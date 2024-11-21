<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { domainStore } from '@/stores/domain'
import { onMounted, ref, computed } from 'vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const store = domainStore()
const data = ref({
    vendor: [],
    user: [],
})

onMounted(async () => {
    await store.getDataCreate()
    data.value.user = store.create.user
    data.value.vendor = store.create.vendor
})

const form = ref({
    domain_name: null,
    start_date: null,
    expired_date: null,
    vendor: null,
    user: null,
    description: null,
    capacity: null,
    hosting_date: null,
    total_email: null,
    login_url: null,
    login_username: null,
    login_password: null,
})

function addTag(newTag) {
    const tag = {
        vendor_name: newTag,
    }
    data.value.vendor.push(tag)
    form.value.vendor = tag
}
function automaticDate(type) {
    if (type == 'start') {
        const date = new Date(form.value.start_date)
        date.setDate(date.getDate() + 365)
        form.value.expired_date = date.toISOString().split('T')[0]
    } else {
        const date = new Date(form.value.expired_date)
        date.setDate(date.getDate() - 365)
        form.value.start_date = date.toISOString().split('T')[0]
    }
}

const handleAdd = async () => {
    processing.value = true
    const formData = new FormData()
    formData.append('domain_name', form.value.domain_name)
    formData.append('start_date', form.value.start_date)
    formData.append('expired_date', form.value.expired_date)
    if (form.value.vendor) {
        formData.append('vendor', form.value.vendor.vendor_name)
    }
    formData.append('user', form.value.user ? form.value.user.id : null)
    formData.append('description', form.value.description)
    formData.append('capacity', form.value.capacity)
    formData.append('hosting_date', form.value.hosting_date)
    formData.append('total_email', form.value.total_email)
    formData.append('login_url', form.value.login_url)
    formData.append('login_username', form.value.login_username)
    formData.append('login_password', form.value.login_password)

    await store.addData(formData, setErrors, processing)
    processing.value = false
}
</script>

<template>
    <AdminLayout title="Add Domain">
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="w-full">
            <form @submit.prevent="handleAdd">
                <div
                    class="dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg p-5 rounded-lg grid grid-cols-2 gap-3">
                    <div class="flex flex-col gap-1 col-span-2">
                        <label for="" class="dark:text-white text-sm"
                            >Domain Name*</label
                        >
                        <input
                            type="text"
                            v-model="form.domain_name"
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            required />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >Start Date*</label
                        >
                        <input
                            type="date"
                            @input="automaticDate('start')"
                            v-model="form.start_date"
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            required />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >Expired Date*</label
                        >
                        <input
                            type="date"
                            @input="automaticDate('expired')"
                            v-model="form.expired_date"
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            required />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >Vendor*</label
                        >
                        <multiselect
                            v-model="form.vendor"
                            :options="data?.vendor"
                            :searchable="true"
                            :close-on-select="true"
                            label="vendor_name"
                            :taggable="true"
                            @tag="addTag"
                            track-by="vendor_name"
                            :preserve-search="true"
                            placeholder="Select Vendor"></multiselect>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >User</label
                        >
                        <multiselect
                            v-model="form.user"
                            :options="data?.user"
                            :searchable="true"
                            :close-on-select="true"
                            label="name"
                            track-by="name"
                            :preserve-search="true"
                            placeholder="Select User"></multiselect>
                    </div>
                    <div class="flex flex-col gap-1 col-span-2">
                        <label for="" class="dark:text-white text-sm"
                            >Description</label
                        >
                        <textarea
                            v-model="form.description"
                            name=""
                            id=""
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            rows="5"></textarea>
                    </div>
                    <fieldset
                        class="border rounded-lg dark:!border-typography-1 p-5 col-span-2">
                        <legend
                            class="dark:text-typography-1 border rounded-lg dark:!border-typography-1 px-8 py-1 text-sm">
                            Hosting
                        </legend>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex flex-col gap-1">
                                <label for="" class="dark:text-white text-sm"
                                    >Capacity</label
                                >
                                <input
                                    type="number"
                                    v-model="form.capacity"
                                    class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="" class="dark:text-white text-sm"
                                    >Hosting Date</label
                                >
                                <input
                                    type="date"
                                    v-model="form.hosting_date"
                                    class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="" class="dark:text-white text-sm"
                                    >Total Email</label
                                >
                                <input
                                    type="number"
                                    v-model="form.total_email"
                                    class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="" class="dark:text-white text-sm"
                                    >Login Url</label
                                >
                                <input
                                    type="text"
                                    v-model="form.login_url"
                                    class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="" class="dark:text-white text-sm"
                                    >Login Username</label
                                >
                                <input
                                    type="text"
                                    v-model="form.login_username"
                                    class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label for="" class="dark:text-white text-sm"
                                    >Login Password</label
                                >
                                <input
                                    type="text"
                                    v-model="form.login_password"
                                    class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm" />
                            </div>
                        </div>
                    </fieldset>
                    <div class="flex justify-end col-span-2">
                        <button
                            class="bg-secondary-3 px-5 min-w-24 py-1 rounded-lg text-white hover:bg-opacity-80 flex justify-center items-center gap-3">
                            <p>Save</p>
                            <svg
                                v-if="processing"
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
                    </div>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>
