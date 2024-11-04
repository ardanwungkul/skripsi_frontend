import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const packageStore = defineStore({
    id: 'package',
    state: () => ({
        packages: [],
        loading: false,
        error: null,
        package: {},
        create: [],
        edit: [],
    }),
    getters: {
        allData: state => state.packages,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/package')
                    .then(response => {
                        this.packages = response.data
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
                    .get('/api/package/create')
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
                    .get(`/api/package/${id}/edit`)
                    .then(response => {
                        this.edit = response.data
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
                const response = await axios.get(`/api/package/${id}`)
                if (response.status === 200) {
                    this.package = response.data
                } else {
                    this.package = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.package = {}
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
                .post('/api/package', form)
                .then(response => {
                    processing.value = false
                    this.packages.push(response.data)
                    this.router.push({ name: 'admin.package.index' })
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
                .post(`/api/package/${id}`, form)
                .then(response => {
                    this.router.push({ name: 'admin.package.index' })
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
                const response = await axios.delete(`/api/package/${id}`)
                this.packages = this.packages.filter(
                    Package => Package.id !== id,
                )
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
    import.meta.hot.accept(acceptHMRUpdate(packageStore, import.meta.hot))
}
