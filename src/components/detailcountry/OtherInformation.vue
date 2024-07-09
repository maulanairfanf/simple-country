<script setup>
import { ref, onMounted } from 'vue'
import api from '../../hooks/api'
import BoxInformationCountry from '../reusable/BoxInformationCountry.vue'

const props = defineProps({
	currency: {
		type: String,
		default: '',
		required: true,
	},
	callingCode: {
		type: String,
		default: '',
		required: true,
	},
})

const listCountryCallingCode = ref([])
const listCountryCurrency = ref([])

const isLoading = ref(false)

async function getCallingCodeCountry() {
	isLoading.value = true
	try {
		const response = await api.get(`/v2/callingcode/${props.callingCode}`)
		if (response) {
			console.log('response, getCallingCodeCountry', response)
			listCountryCallingCode.value = response.data.map(country => country.name)
		}
	} catch (error) {
		console.log('error')
	}
	isLoading.value = false
}

async function getCurrencyCountry() {
	isLoading.value = true
	try {
		const response = await api.get(`/v2/currency/${props.currency}`)
		if (response) {
			listCountryCurrency.value = response.data.map(country => country.name)
		}
	} catch (error) {
		console.log('error')
	}
	isLoading.value = false
}

onMounted(async () => {
	await getCallingCodeCountry()
	await getCurrencyCountry()
})
</script>
<template>
	<div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
		<BoxInformationCountry
			title="Calling Code"
			description="with this calling code"
			:kind="callingCode"
			:listCountry="listCountryCallingCode"
		/>
		<BoxInformationCountry
			title="Currency"
			description="with this currency"
			:kind="currency"
			:listCountry="listCountryCurrency"
		/>
	</div>
</template>
