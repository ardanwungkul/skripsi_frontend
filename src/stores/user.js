import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const userStore = defineStore({
    id: 'user',
    state: () => ({
        edit: [],
        users: [],
        loading: false,
        error: null,
        user: {},
    }),
    getters: {
        allData: state => state.users,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/users')
                    .then(response => {
                        this.users = response.data
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
                    .get(`/api/users/${id}/edit`)
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
                const response = await axios.get(`/api/users/${id}`)
                if (response.status === 200) {
                    this.user = response.data
                } else {
                    this.user = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.user = {}
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
                .post('/api/users', form)
                .then(response => {
                    processing.value = false
                    this.users.push(response.data)
                    this.router.push({ name: 'user.index' })
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
                .post(`/api/users/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'user.index' })
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
                const response = await axios.delete(`/api/users/${id}`)
                this.users = this.users.filter(User => User.id !== id)
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
    import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}
