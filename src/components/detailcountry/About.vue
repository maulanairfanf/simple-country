<script setup>
defineProps({
	name: {
		type: String,
		default: '',
		required: true,
	},
	altSpellings: {
		type: Array,
		default: () => [],
		required: true,
	},
	flagURL: {
		type: String,
		default: '',
		required: true,
	},
})
</script>
<template>
	<div class="mt-10">
		<div class="flex items-center">
			<span class="mr-4 text-5xl font-bold"> {{ name }} </span>
			<img class="w-18 h-10" :src="flagURL" :alt="name" />
		</div>
		<div class="flex items-center flex-wrap mt-4">
			<div
				class="badge-country"
				v-for="(item, index) in altSpellings"
				:key="index"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>
