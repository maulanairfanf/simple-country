// stores/countryStore.js
import { defineStore } from 'pinia'
import api from '../hooks/api'
import { debounce } from 'lodash'

export const useCountryStore = defineStore('country', {
	state: () => ({
		query: '',
		listData: [],
		isLoading: false,
		detailCountry: {},
		callingCode: '',
		currency: '',
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
						console.log('response fetchCountry', response)

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

		async fetchDetailCountry(nameCountry) {
			this.isLoading = true
			try {
				const response = await api.get(
					`/v3.1/name/${nameCountry}?fullText=true`
				)
				if (response) {
					console.log('response fetchDetailCountry', response)
					this.detailCountry = response.data[0]
					this.handleGetCurrency()
					this.handleGetCallingCode()
				}
			} catch (error) {
				console.log('error', error)
			}
			this.isLoading = false
		},

		handleGetCurrency() {
			this.currency = Object.keys(this.detailCountry.currencies)[0]
		},

		handleGetCallingCode() {
			console.log(this.detailCountry.idd.root.replace('+', ''))
			this.callingCode =
				this.detailCountry.idd.root.replace('+', '') +
				this.detailCountry.idd.suffixes[0]
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
