<template>
	<div class="container mx-auto px-2 md:px-0">
		<div
			v-if="
				Object.keys(countryStore.detailCountry).length === 0 &&
				!countryStore.isLoading
			"
		>
			<EmptyBox message="Country not found" />
		</div>

		<div class="mt-10 md:mt-24" v-else-if="!countryStore.isLoading">
			<ButtonBack title="Back to Homepage" to="/" />
			<About
				:name="countryStore.detailCountry.name.common"
				:flagURL="countryStore.detailCountry.flags.png"
				:altSpellings="countryStore.detailCountry.altSpellings"
			/>
			<Location
				:capital="countryStore.detailCountry.capital[0]"
				:region="countryStore.detailCountry.region"
				:subregion="countryStore.detailCountry.subregion"
				:latLang="countryStore.detailCountry.latlng"
			/>
			<OtherInformation
				:currency="countryStore.currency"
				:callingCode="countryStore.callingCode"
			/>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import ButtonBack from '../components/reusable/ButtonBack.vue'
import Location from '../components/detailcountry/Location.vue'
import About from '../components/detailcountry/About.vue'
import OtherInformation from '../components/detailcountry/OtherInformation.vue'
import { useCountryStore } from '../stores/country'
import { useRoute } from 'vue-router'
import EmptyBox from '../components/reusable/EmptyBox.vue'

const route = useRoute()
const countryStore = useCountryStore()

onBeforeMount(() => {
	countryStore.isLoading = true
})

onMounted(async () => {
	if (route.params && route.params.name !== '') {
		await countryStore.fetchDetailCountry(route.params.name)
	}
})
</script>
