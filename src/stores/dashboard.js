import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const dashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        data: [],
        loading: false,
        error: null,
    }),
    getters: {
        allData: state => state.data,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/dashboard')
                    .then(response => {
                        this.data = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataSupport(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/dashboard-support/${id}`)
                    .then(response => {
                        this.data = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(dashboardStore, import.meta.hot))
}
