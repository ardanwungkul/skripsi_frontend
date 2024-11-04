<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, ref, computed } from 'vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { templateStore } from '@/stores/template'

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const store = templateStore()

const form = ref({
    template_name: null,
    template_url: null,
    template_image: null,
})
const handleAdd = async () => {
    processing.value = true
    const formData = new FormData()
    formData.append('template_name', form.value.template_name)
    formData.append('template_url', form.value.template_url)
    formData.append('template_image', form.value.template_image)

    await store.addData(formData, setErrors, processing)
    processing.value = false
}
const changePlaceholder = event => {
    const file = event.target.files[0]
    if (file) {
        form.value.template_image = file
    }
}
</script>

<template>
    <AdminLayout title="Add Template">
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="w-full">
            <form @submit.prevent="handleAdd">
                <div
                    class="dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg p-5 rounded-lg space-y-3">
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >Template Name*</label
                        >
                        <input
                            type="text"
                            v-model="form.template_name"
                            placeholder="Enter Template Name"
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            required />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >Template Url*</label
                        >
                        <input
                            type="url"
                            v-model="form.template_url"
                            placeholder="Enter Template Url"
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            required />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="dark:text-white text-sm"
                            >Template Image*</label
                        >
                        <input
                            type="file"
                            accept="image/*"
                            @change="changePlaceholder"
                            placeholder="Enter Template image"
                            class="rounded-lg dark:bg-dark-primary-1 bg-light-primary-2 dark:border-typography-2 dark:text-white text-sm"
                            required />
                    </div>
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
