<script setup>
import { computed } from 'vue'
import Tooltip from './Tooltip.vue'

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	kind: {
		type: String,
		default: '',
	},
	listCountry: {
		type: Array,
		default: () => [],
	},
})

const getTitleTooltip = computed(() => {
	if (props.listCountry.length > 1) {
		return props.listCountry.length + ' countries'
	} else if (props.listCountry.length === 1) {
		return props.listCountry.length + ' country'
	} else {
		return ''
	}
})
</script>
<template>
	<div class="flex flex-col">
		<div class="font-bold my-1 text-lg">{{ title }}</div>
		<div class="text-purple-500 text-5xl font-bold my-1">{{ kind }}</div>
		<Tooltip
			:title="getTitleTooltip"
			:listData="listCountry"
			:description="description"
		/>
	</div>
</template>
