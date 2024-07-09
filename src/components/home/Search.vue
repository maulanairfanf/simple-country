<template>
	<div class="w-screen h-screen flex justify-center items-center">
		<div class="md:w-1/3 relative">
			<label
				for="country"
				class="block text-6xl font-medium text-gray-900 text-center mb-10"
				>COUNTRY</label
			>
			<div class="relative rounded-lg shadow-sm">
				<input
					@focus="handleFocus"
					@blur="handleBlur"
					type="text"
					name="country"
					id="country"
					class="input-search"
					placeholder="Type any country name"
					v-model="countryStore.query"
					@input="handleInput"
					autocomplete="off"
				/>
				<div
					class="absolute inset-y-0 right-4 flex items-center"
					:class="isFocus ? 'text-purple-500' : 'text-gray-200'"
				>
					<svg
						width="23"
						height="23"
						viewBox="0 0 23 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.875 0.75C11.0299 0.75 13.0965 1.60602 14.6202 3.12976C16.144 4.65349 17 6.72012 17 8.875C17 10.8875 16.2625 12.7375 15.05 14.1625L15.3875 14.5H16.375L22.625 20.75L20.75 22.625L14.5 16.375V15.3875L14.1625 15.05C12.6882 16.3085 10.8134 16.9999 8.875 17C6.72012 17 4.65349 16.144 3.12976 14.6202C1.60602 13.0965 0.75 11.0299 0.75 8.875C0.75 6.72012 1.60602 4.65349 3.12976 3.12976C4.65349 1.60602 6.72012 0.75 8.875 0.75ZM8.875 3.25C5.75 3.25 3.25 5.75 3.25 8.875C3.25 12 5.75 14.5 8.875 14.5C12 14.5 14.5 12 14.5 8.875C14.5 5.75 12 3.25 8.875 3.25Z"
							fill="currentColor"
						/>
					</svg>
				</div>
			</div>
			<div
				class="absolute mt-2 shadow w-full rounded-lg text-gray-900"
				v-if="isFocus"
			>
				<div
					v-if="countryStore.isLoading && countryStore.query !== ''"
					class="py-2 cursor-pointer p-4 rounded-lg text-gray-900"
				>
					IsLoading...
				</div>
				<div
					v-else-if="countryStore.listData.length > 0"
					v-for="(item, index) in countryStore.listData"
					@click="handleSelectCountry(item.name.common, router)"
					class="py-2 hover:bg-gray-200 cursor-pointer p-4 rounded-lg w-full text-gray-900"
					:key="index"
				>
					{{ item.name.common }}
				</div>
				<div
					v-else-if="countryStore.showError"
					class="py-2 cursor-pointer p-4 rounded-lg text-red-500"
				>
					Data not found
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCountryStore } from '../../stores/country'

const countryStore = useCountryStore()
const router = useRouter()
const isFocus = ref(false)

function handleFocus() {
	isFocus.value = true
}
function handleBlur() {
	setTimeout(() => {
		isFocus.value = false
	}, 200)
}

function handleSelectCountry(payload, router) {
	router.push('detail-country/' + payload)
}

function handleInput() {
	countryStore.isLoading = true
	countryStore.debouncedFetchData()
}
</script>
