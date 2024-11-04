import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const orderStore = defineStore({
    id: 'order',
    state: () => ({
        orders: [],
        loading: false,
        error: null,
        order: {},
        create: {},
    }),
    getters: {
        allData: state => state.orders,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/order')
                    .then(response => {
                        this.orders = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataCreate() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/order/create')
                    .then(response => {
                        this.create = response.data
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
                const response = await axios.get(`/api/order/${id}`)
                if (response.status === 200) {
                    this.order = response.data
                } else {
                    this.order = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.order = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async getDataByCode(code) {
            this.loading = true
            try {
                const response = await axios.get(`/api/order-by-code/${code}`)
                if (response.status === 200) {
                    this.order = response.data
                } else {
                    this.order = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.order = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async getDataByUserId(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/order-by-user-id/${id}`)
                if (response.status === 200) {
                    this.orders = response.data
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.orders = []
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
                .post('/api/order', form)
                .then(response => {
                    processing.value = false
                    this.router.push({
                        name: 'user.order.checkout',
                        params: {
                            code: response.data.order_code,
                        },
                    })
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
        async process(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/order-process', form)
                .then(response => {
                    processing.value = false
                    const index = this.orders.findIndex(
                        order => order.id === response.data.id,
                    )

                    if (index !== -1) {
                        this.orders[index] = response.data
                    }
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
        async payment(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/payment', form)
                .then(response => {
                    processing.value = false
                    console.log(response)
                    window.location = response.data.invoice_url
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
                .post(`/api/order/${id}`, form)
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
                const response = await axios.delete(`/api/order/${id}`)
                this.orders = this.orders.filter(Order => Order.id !== id)
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
    import.meta.hot.accept(acceptHMRUpdate(orderStore, import.meta.hot))
}
