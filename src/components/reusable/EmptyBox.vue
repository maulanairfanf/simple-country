<template>
	<div class="w-full h-screen flex flex-col items-center justify-center">
		<h1 class="text-5xl font-semibold mb-10">
			{{ message }}
		</h1>
		<ButtonBack title="Back to Homepage" to="/" />
	</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import ButtonBack from './ButtonBack.vue'
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
