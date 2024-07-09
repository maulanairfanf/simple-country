<script setup>
import { onMounted } from 'vue'
import BoxInformationCountry from '../reusable/BoxInformationCountry.vue'
import { useCountryStore } from '../../stores/country'

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

const countryStore = useCountryStore()

onMounted(async () => {
	await countryStore.fetchCallingCodeCountry(props.callingCode)
	await countryStore.fetchCurrencyCountry(props.currency)
})
</script>
<template>
	<div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
		<BoxInformationCountry
			title="Calling Code"
			description="with this calling code"
			:kind="callingCode"
			:listCountry="countryStore.listCountryCallingCode"
		/>
		<BoxInformationCountry
			title="Currency"
			description="with this currency"
			:kind="currency"
			:listCountry="countryStore.listCountryCurrency"
		/>
	</div>
</template>
