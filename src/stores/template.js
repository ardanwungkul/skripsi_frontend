import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const templateStore = defineStore({
    id: 'template',
    state: () => ({
        templates: [],
        loading: false,
        error: null,
        template: {},
        create: [],
        edit: [],
    }),
    getters: {
        allData: state => state.templates,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/template')
                    .then(response => {
                        this.templates = response.data
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
                    .get('/api/template/create')
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
                    .get(`/api/template/${id}/edit`)
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
                const response = await axios.get(`/api/template/${id}`)
                if (response.status === 200) {
                    this.template = response.data
                } else {
                    this.template = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.template = {}
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
                .post('/api/template', form)
                .then(response => {
                    processing.value = false
                    this.templates.push(response.data)
                    this.router.push({ name: 'admin.template.index' })
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
                .post(`/api/template/${id}`, form)
                .then(response => {
                    this.router.push({ name: 'admin.template.index' })
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
                const response = await axios.delete(`/api/template/${id}`)
                this.templates = this.templates.filter(
                    Template => Template.id !== id,
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
    import.meta.hot.accept(acceptHMRUpdate(templateStore, import.meta.hot))
}
