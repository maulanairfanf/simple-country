<template>
	<div class="container mx-auto px-2 md:px-0">
		<div v-if="!detailCountry">Country is not found</div>
		<div class="mt-10 md:mt-24" v-if="!isLoading">
			<ButtonBack title="Back to Homepage" to="/" />
			<About
				:name="detailCountry.name.common"
				:flagURL="detailCountry.flags.png"
				:altSpellings="detailCountry.altSpellings"
			/>
			<Location
				:capital="detailCountry.capital[0]"
				:region="detailCountry.region"
				:subregion="detailCountry.subregion"
				:latLang="detailCountry.latlng"
			/>
			<OtherInformation :currency="currency" :callingCode="callingCode" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ButtonBack from '../components/reusable/ButtonBack.vue'
import Location from '../components/detailcountry/Location.vue'
import About from '../components/detailcountry/About.vue'
import OtherInformation from '../components/detailcountry/OtherInformation.vue'
import api from '../hooks/api'
import { useRoute } from 'vue-router'

const route = useRoute()

const isLoading = ref(true)

const detailCountry = ref({})
const callingCode = ref('')
const currency = ref('')
const country = ref('')

onMounted(async () => {
	country.value = route.params.name
	if (country.value !== '') {
		await getDetailCountry()
	}
})

function handleGetCurrency() {
	currency.value = Object.keys(detailCountry.value.currencies)[0]
}

function handleGetCallingCode() {
	callingCode.value =
		detailCountry.value.idd.root.replace('+', '') +
		detailCountry.value.idd.suffixes[0]
}

async function getDetailCountry() {
	isLoading.value = true
	try {
		const response = await api.get(`/v3.1/name/${country.value}?fullText=true`)
		if (response) {
			detailCountry.value = response.data[0]
			handleGetCurrency()
			handleGetCallingCode()
		}
	} catch (error) {
		console.log('error')
	}
	isLoading.value = false
}
</script>
