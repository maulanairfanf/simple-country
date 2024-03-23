<script setup>
import { ref } from 'vue'

defineProps({
	title: {
		type: String,
		required: true,
		default: '',
	},
	listData: {
		type: Array,
		required: true,
		default: () => [],
	},
	description: {
		type: String,
		required: true,
		default: '',
	},
})

const isShow = ref(false)
function handleTooltip(event) {
	if (event.type === 'mouseover') {
		isShow.value = true
	} else if (event.type === 'mouseleave') {
		isShow.value = false
	}
}
</script>
<template>
	<div class="flex flex-col my-1">
		<div>
			<span
				v-on:mouseover="handleTooltip"
				v-on:mouseleave="handleTooltip"
				data-tooltip-target="tooltip-default"
				class="underline underline-offset-1 text-purple-500 cursor-pointer"
			>
				{{ title }}
			</span>
			<span class="ml-1">{{ description }}</span>
		</div>

		<div
			:class="!isShow && 'invisible opacity-0'"
			role="tooltip"
			class="tooltip"
		>
			<span class="block" v-for="(item, index) in listData" :key="index">
				{{ item }}
			</span>
		</div>
	</div>
</template>
