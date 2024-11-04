import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const vendorStore = defineStore({
    id: 'vendor',
    state: () => ({
        vendors: [],
        loading: false,
        error: null,
        vendor: {},
    }),
    getters: {
        allData: state => state.vendors,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/vendor')
                    .then(response => {
                        this.vendors = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataById(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/vendor/${id}`)
                if (response.status === 200) {
                    this.vendor = response.data
                } else {
                    this.vendor = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.vendor = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async addData(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/vendor', form)
                .then(response => {
                    processing.value = false
                    this.vendors.push(response.data)
                    this.router.push({ name: 'vendor.index' })
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },
        async editData(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/vendor/${id}`, form)
                .then(response => {
                    this.getData()
                    processing.value = false
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },
        async deleteData(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/vendor/${id}`)
                this.vendors = this.vendors.filter(Vendor => Vendor.id !== id)
                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(vendorStore, import.meta.hot))
}
