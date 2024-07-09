// stores/countryStore.js
import { defineStore } from 'pinia'
import api from '../hooks/api'
import { debounce } from 'lodash'

export const useCountryStore = defineStore('country', {
	state: () => ({
		query: '',
		listData: [],
		isLoading: false,
	}),
	getters: {
		showError(state) {
			return (
				state.query !== '' && !state.isLoading && state.listData.length === 0
			)
		},
	},
	actions: {
		debouncedFetchData: debounce(async function () {
			await this.fetchCountry()
		}, 500),
		async fetchCountry() {
			if (this.query !== '') {
				try {
					const response = await api.get('/v3.1/name/' + this.query)
					if (response) {
						this.handleShowData(response.data)
					}
				} catch (error) {
					this.listData = []
				}
			} else {
				this.listData = []
			}
			this.isLoading = false
		},
		handleShowData(payload) {
			if (payload.length > 5) {
				this.listData = payload.slice(0, 5)
			} else {
				this.listData = payload
			}
		},
	},
})
