<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import api from '../../hooks/api'
import { useRouter } from 'vue-router'

const query = ref('')
const listData = ref([])
const isFocus = ref(false)
const router = useRouter()
const isLoading = ref(false)

async function getCountry() {
	isLoading.value = true
	try {
		const response = await api.get('/v3.1/name/' + query.value)
		if (response) {
			console.log('response: ', response)
			handleShowData(response.data)
		}
	} catch (error) {
		listData.value = []
		console.log('error: ', error)
	}
	isLoading.value = false
}

function handleShowData(payload) {
	if (payload.length > 5) {
		listData.value = payload.slice(0, 5)
	} else {
		listData.value = payload
	}
}

function handleFocus() {
	isFocus.value = true
}

function handleBlur() {
	setTimeout(() => {
		isFocus.value = false
	}, 200)
}

function handleSelectCountry(payload) {
	router.push('detail-country/' + payload)
}

const isError = computed(() => {
	return listData.value.length === 0 && query.value !== '' && !isLoading.value
})

onMounted(() => {
	if (query.value !== '') getCountry()
})

watch(query, newValue => {
	if (newValue !== '') {
		getCountry()
	} else {
		listData.value = []
	}
})
</script>
<template>
	<div class="w-screen h-screen flex justify-center items-center">
		<div class="w-1/3 relative">
			<label
				for="country"
				class="block text-6xl font-medium text-gray-900 text-center mb-10"
				>COUNTRY</label
			>
			<div class="relative rounded-md shadow-sm">
				<input
					v-model="query"
					v-on:focus="handleFocus"
					v-on:blur="handleBlur"
					type="text"
					name="country"
					id="country"
					class="w-full rounded-md border-0 text-gray-900 ring-1 ring-gray-200 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-4 focus:outline-none"
					placeholder="Type any country name"
				/>
				<div
					class="absolute inset-y-0 right-4 flex items-center"
					:class="isFocus ? 'text-purple-600' : 'text-gray-200'"
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
				class="absolute mt-2 shadow w-full rounded-md text-gray-900"
				v-if="isFocus"
			>
				<div
					v-if="isLoading"
					class="py-2 cursor-pointer p-4 rounded-md text-gray-900"
				>
					IsLoading...
				</div>
				<div
					@click="handleSelectCountry(item.name.common)"
					v-else-if="listData.length > 0"
					class="py-2 hover:bg-gray-200 cursor-pointer p-4 rounded-md w-full text-gray-900"
					v-for="(item, index) in listData"
					:key="index"
				>
					{{ item.name.common }}
				</div>
				<div
					v-else-if="isError"
					class="py-2 cursor-pointer p-4 rounded-md text-red-500"
				>
					Data not found
				</div>
			</div>
		</div>
	</div>
</template>
