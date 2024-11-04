<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { whoisStore } from '@/stores/whois'
import { orderStore } from '@/stores/order'
import { useUsers } from '@/stores/auth'
import ValidationErrors from '@/components/ValidationErrors.vue'

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
const storeOrder = orderStore()
const storeWhois = whoisStore()
const storeUser = useUsers()
const auth = storeUser.authUser
const processing = ref(false)
const whoisData = ref()
const packages = ref()
const templates = ref()
const status = ref({
    available: false,
    exist: false,
})
const domainError = ref()

const form = ref({
    input_domain: null,
    package: null,
    template: null,
    domain_name: null,
    description: null,
})
const ppn = computed(() => (form.value.package?.package_price * 11) / 100)

onBeforeMount(() => {
    if (auth) {
        storeUser.getData()
    }
})
onMounted(async () => {
    await storeOrder.getDataCreate()
    packages.value = storeOrder.create.package
    templates.value = storeOrder.create.template
})
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const validateDomain = async () => {
    const domainPattern = /^(?!\-)[A-Za-z0-9\-]{1,63}(?<!\-)\.(?:[A-Za-z]{2,})$/
    if (
        form.value.input_domain === '' ||
        domainPattern.test(form.value.input_domain)
    ) {
        domainError.value = ''
    } else {
        form.value.input_domain = ''
        domainError.value = 'Masukkan domain yang valid.'
    }
    processing.value = true
    await storeWhois.getData(form.value.input_domain, processing)
    whoisData.value = storeWhois.data
    if (whoisData.value.WhoisRecord.domainAvailability == 'UNAVAILABLE') {
        form.value.input_domain = ''
        status.value.available = false
        status.value.exist = true
    } else {
        form.value.domain_name = form.value.input_domain
        status.value.available = true
        status.value.exist = false
    }
}
const submitOrder = async () => {
    processing.value = true
    const formData = new FormData()
    formData.append('domain_name', form.value.domain_name)
    formData.append('description', form.value.description)
    formData.append('package', form.value.package.id)
    formData.append('template', form.value.template.id)
    formData.append('user_id', storeUser.userData.id)
    formData.append(
        'amount',
        form.value.package.package_price +
            (form.value.package.package_price * 11) / 100,
    )

    await storeOrder.addData(formData, processing, setErrors)
    processing.value = false
}
</script>
<template>
    <UserLayout>
        <form @submit.prevent="submitOrder">
            <div class="pt-28 pb-20 max-w-6xl mx-auto">
                <ValidationErrors class="w-full" :errors="errors" />
                <div class="grid grid-cols-3 gap-5">
                    <div class="col-span-2 space-y-5">
                        <fieldset
                            class="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-400">
                            <legend
                                class="rounded-lg border px-10 py-1 ml-3 bg-[#ff9800] text-white text-sm">
                                Domain
                            </legend>
                            <div>
                                <div class="flex flex-col gap-2">
                                    <label
                                        for="input_domain"
                                        class="text-sm flex gap-3 items-center"
                                        ><p>Nama Domain</p>
                                    </label>
                                    <div class="flex gap-3">
                                        <input
                                            v-model="form.input_domain"
                                            type="text"
                                            required
                                            placeholder="Masukkan Nama Domain"
                                            @blur="validateDomain"
                                            id="input_domain"
                                            class="text-sm rounded-lg w-full" />
                                    </div>
                                    <p
                                        v-if="status.exist"
                                        class="text-xs text-red-500">
                                        Domain Tidak Tersedia
                                    </p>
                                    <p
                                        v-if="status.available"
                                        class="text-xs text-green-500">
                                        Domain Tersedia
                                    </p>
                                    <span
                                        v-if="domainError"
                                        class="text-red-500 text-sm"
                                        >{{ domainError }}</span
                                    >
                                </div>
                            </div>
                        </fieldset>
                        <fieldset
                            class="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-400">
                            <legend
                                class="rounded-lg border px-10 py-1 ml-3 bg-[#ff9800] text-white text-sm">
                                Paket Website
                            </legend>
                            <div>
                                <div class="grid grid-cols-3 gap-3">
                                    <div
                                        class="w-full relative"
                                        v-for="(item, index) in packages"
                                        :key="index">
                                        <input
                                            required
                                            type="radio"
                                            name="package"
                                            :id="item.id"
                                            v-model="form.package"
                                            :value="item"
                                            class="w-0 h-0 opacity-0 absolute top-0" />
                                        <label :for="item.id">
                                            <div
                                                :class="{
                                                    'ring-2 ring-blue-500':
                                                        form.package === item,
                                                }"
                                                class="border w-full rounded-lg p-3">
                                                <p
                                                    class="text-center border-b text-sm">
                                                    {{ item.package_name }}
                                                </p>
                                                <div class="py-1 text-xs">
                                                    <p
                                                        class="text-center mb-3 font-bold">
                                                        Rp.
                                                        {{
                                                            formatPrice(
                                                                item.package_price,
                                                            )
                                                        }}
                                                    </p>
                                                    <div
                                                        class="flex justify-between">
                                                        <p class="">
                                                            Hosting Storage
                                                        </p>
                                                        <p>
                                                            {{
                                                                item.package_hosting_storage
                                                            }}
                                                            GB
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="flex justify-between">
                                                        <p class="">Email</p>
                                                        <p>
                                                            {{
                                                                item.package_hosting_email
                                                            }}
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="flex justify-between">
                                                        <p class="">
                                                            Free Maintenance
                                                        </p>
                                                        <i
                                                            class="fa-solid"
                                                            :class="
                                                                item.package_support
                                                                    ? 'fa-check text-green-500'
                                                                    : 'fa-x text-red-500'
                                                            "></i>
                                                    </div>
                                                    <div
                                                        class="flex justify-between">
                                                        <p class="">
                                                            Free Video Profile
                                                        </p>
                                                        <i
                                                            class="fa-solid"
                                                            :class="
                                                                item.package_video_profile
                                                                    ? 'fa-check text-green-500'
                                                                    : 'fa-x text-red-500'
                                                            "></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset
                            class="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-400">
                            <legend
                                class="rounded-lg border px-10 py-1 ml-3 bg-[#ff9800] text-white text-sm">
                                Template Website
                            </legend>
                            <div>
                                <div class="grid grid-cols-4 gap-4">
                                    <div
                                        class="relative flex gap-3"
                                        v-for="(item, index) in templates"
                                        :key="index">
                                        <input
                                            required
                                            type="radio"
                                            name="template"
                                            v-model="form.template"
                                            :value="item"
                                            class="rounded-lg w-0 h-0 opacity-0 absolute top-0"
                                            :id="'template-' + item.id" />
                                        <label
                                            :for="'template-' + item.id"
                                            :class="{
                                                'ring-2 ring-blue-500':
                                                    form.template === item,
                                            }"
                                            class="border w-full rounded-lg relative h-auto">
                                            <div class="p-1">
                                                <a
                                                    target="_blank"
                                                    :href="item.template_url"
                                                    class="hover:underline">
                                                    <p
                                                        class="text-sm line-clamp-1 px-1 font-medium">
                                                        {{ item.template_name }}
                                                    </p>
                                                </a>
                                            </div>
                                            <img
                                                class="w-full object-contain"
                                                :src="
                                                    backendUrl +
                                                    '/storage/images/template/' +
                                                    item.template_image
                                                "
                                                alt="" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset
                            class="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-400">
                            <legend
                                class="rounded-lg border px-10 py-1 ml-3 bg-[#ff9800] text-white text-sm">
                                Catatan
                            </legend>
                            <div>
                                <textarea
                                    v-model="form.description"
                                    rows="4"
                                    class="w-full rounded-lg text-sm"
                                    placeholder="Masukkan Catatan Seperti Request Design / Data Company Profile (optional)"
                                    id=""></textarea>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-span-1">
                        <fieldset
                            class="w-full bg-white shadow-lg rounded-lg p-5 border border-gray-400 col-span-2 relative">
                            <legend
                                class="rounded-lg border px-10 py-1 ml-3 bg-[#ff9800] text-white text-sm">
                                Detail Order
                            </legend>
                            <svg
                                v-if="processing"
                                role="status"
                                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 absolute top-3 right-3"
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
                            <div class="space-y-3">
                                <div class="flex justify-between px-3">
                                    <div class="grid">
                                        <p class="text-xs line-clamp-1">
                                            Nama Domain
                                        </p>
                                    </div>
                                    <p class="text-xs whitespace-nowrap">
                                        {{
                                            form.domain_name
                                                ? form.domain_name
                                                : ''
                                        }}
                                    </p>
                                </div>
                                <div class="flex justify-between px-3">
                                    <div class="grid">
                                        <p class="text-xs line-clamp-1">
                                            Nama Template
                                        </p>
                                    </div>
                                    <p class="text-xs whitespace-nowrap">
                                        {{
                                            form.template
                                                ? form.template.template_name
                                                : ''
                                        }}
                                    </p>
                                </div>
                                <div class="flex justify-between px-3">
                                    <div class="grid">
                                        <p class="text-xs line-clamp-1">
                                            {{
                                                form.package
                                                    ? form.package.package_name
                                                    : 'Nama Paket'
                                            }}
                                        </p>
                                    </div>
                                    <p class="text-xs whitespace-nowrap">
                                        Rp.
                                        <span>{{
                                            form.package
                                                ? formatPrice(
                                                      form.package
                                                          .package_price,
                                                  )
                                                : 0
                                        }}</span>
                                    </p>
                                </div>

                                <div class="flex justify-between px-3">
                                    <div class="grid">
                                        <p class="text-xs line-clamp-1">
                                            PPN 11%
                                        </p>
                                    </div>
                                    <p class="text-xs whitespace-nowrap">
                                        Rp.
                                        <span>{{
                                            form.package ? formatPrice(ppn) : 0
                                        }}</span>
                                    </p>
                                </div>
                                <div
                                    class="bg-[#ff9800] px-3 text-sm flex justify-between py-1 items-center rounded-lg">
                                    <p class="text-white">Total</p>
                                    <p
                                        class="text-xs whitespace-nowrap text-white">
                                        Rp.
                                        <span>{{
                                            form.package
                                                ? formatPrice(
                                                      form.package
                                                          .package_price +
                                                          (form.package
                                                              ?.package_price *
                                                              11) /
                                                              100,
                                                  )
                                                : 0
                                        }}</span>
                                    </p>
                                </div>
                                <button
                                    class="bg-[#0A1B65] hover:bg-opacity-90 py-1 px-3 w-full rounded-lg text-white text-sm">
                                    <p>Checkout</p>
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </form>
    </UserLayout>
</template>
