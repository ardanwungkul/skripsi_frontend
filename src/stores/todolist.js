import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const todoListStore = defineStore({
    id: 'todolist',
    state: () => ({
        create: [],
        edit: [],
        todolists: [],
        loading: false,
        error: null,
        todolist: {},
        index: [],
    }),
    getters: {
        allData: state => state.todolists,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/todolist')
                    .then(response => {
                        this.todolists = response.data
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
                    .get(`/api/todolist/user/${id}`)
                    .then(response => {
                        this.todolists = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataIndex() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/todolist/')
                    .then(response => {
                        this.index = response.data
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
                    .get('/api/todolist/create')
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
                    .get(`/api/todolist/${id}/edit`)
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
                const response = await axios.get(`/api/todolist/${id}`)
                if (response.status === 200) {
                    this.todolist = response.data
                } else {
                    this.todolist = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.todolist = {}
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
                .post('/api/todolist', form)
                .then(response => {
                    processing.value = false
                    this.todolists.push(response.data)
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
                .post(`/api/todolist/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'todolist.index' })
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
        async submitTodo(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/todolist-submit/`, form)
                .then(response => {
                    processing.value = false
                    response.data.forEach(item => {
                        const index = this.todolists.findIndex(
                            todo => todo.id === item.id,
                        )
                        if (index !== -1) {
                            this.todolists[index] = item
                        } else {
                            this.todolists.push(item)
                        }
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
        async confirmOrder(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/todolist-confirm-order/`, form)
                .then(response => {
                    processing.value = false
                    this.todolists = this.todolists.filter(
                        todolist => todolist.id !== parseInt(response.data),
                    )
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
                const response = await axios.delete(`/api/todolist/${id}`)
                this.todolists = this.todolists.filter(
                    todolist => todolist.id !== id,
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
        async editStatus(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/todolist/change-status/`, form)
                .then(response => {
                    processing.value = false
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
        async editNote(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/todolist/change-note/`, form)
                .then(response => {
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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(todoListStore, import.meta.hot))
}
