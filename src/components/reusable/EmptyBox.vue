<template>
	<div class="w-full h-screen flex flex-col items-center justify-center">
		<h1 class="text-5xl font-semibold mb-10">
			{{ message }}
		</h1>
		<button
			@click="handleRedirect"
			class="rounded-lg px-4 py-2 border border-purple-500 outline-none hover:border-gray-500 hover:bg-purple-500 hover:text-white font-semibold"
		>
			Back to home
		</button>
	</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
defineProps({
	message: {
		type: String,
		required: true,
	},
})

const router = useRouter()

function handleRedirect() {
	router.push('/')
}
</script>
