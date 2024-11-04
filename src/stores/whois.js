import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const whoisStore = defineStore({
    id: 'whois',
    state: () => ({
        loading: false,
        error: null,
        data: {},
    }),
    getters: {
        allData: state => state.data,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData(domain, processing) {
            const apiKey = import.meta.env.VITE_API_WHOIS
            const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON&da=1`
            this.loading = true
            try {
                const response = await axios.get(url).then(response => {
                    this.data = response.data
                    processing.value = false
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
    import.meta.hot.accept(acceptHMRUpdate(whoisStore, import.meta.hot))
}
