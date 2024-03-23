<script setup>
defineProps({
	title: {
		type: String,
		default: 'Back',
	},
	to: {
		type: String,
		default: '/',
	},
})
</script>

<template>
	<div>
		<button
			class="rounded-lg text-white bg-purple-500 w-88 p-3 hover:bg-purple-700"
			@click="$router.push(to)"
		>
			<div class="flex">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11 5L4 12L11 19"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M4 12H20"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="ml-2">{{ title }}</span>
			</div>
		</button>
	</div>
</template>
