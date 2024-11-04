import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const domainStore = defineStore({
    id: 'domain',
    state: () => ({
        create: [],
        edit: [],
        domains: [],
        loading: false,
        error: null,
        domain: {},
    }),
    getters: {
        allData: state => state.domains,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/domain')
                    .then(response => {
                        this.domains = response.data
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
                    .get('/api/domain/create')
                    .then(response => {
                        this.create = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataEdit(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/domain/${id}/edit`)
                    .then(response => {
                        this.edit = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataByUserId(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/domain-by-user-id/${id}`)
                    .then(response => {
                        this.domains = response.data
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
                const response = await axios.get(`/api/domain/${id}`)
                if (response.status === 200) {
                    this.domain = response.data
                } else {
                    this.domain = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.domain = {}
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
                .post('/api/domain', form)
                .then(response => {
                    processing.value = false
                    this.domains.push(response.data)
                    this.router.push({ name: 'domain.index' })
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status == 500) {
                        setErrors.value = Object.values([
                            error.response.data.message,
                        ])
                    }
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
                .post(`/api/domain/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'domain.index' })
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
        async deleteData(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/domain/${id}`)
                this.domains = this.domains.filter(Domain => Domain.id !== id)
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
    import.meta.hot.accept(acceptHMRUpdate(domainStore, import.meta.hot))
}
