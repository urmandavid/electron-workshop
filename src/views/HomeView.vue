<script setup>
import ElectronApi from "@/components/ElectronApi.vue"
</script>

<template>
	<div v-for="todo in todoStore.items" :key="todo.title" class="card my-2">
		<div class="card-header">
			<h3 class="d-inline">
				<time>{{ todo.date }}</time> {{ todo.title }}
			</h3>
		</div>
		<div class="card-body d-flex justify-content-between">
			<div>{{ todo.description }}</div>
			<div class="min-width-max-content">
				<button class="btn btn-sm btn-primary mx-2">Done</button>
				<button class="btn btn-sm btn-secondary">Remove</button>
			</div>
		</div>
	</div>
	<!--<main>
		<ElectronApi />
	</main>-->
</template>

<script>
import { mapStores } from "pinia"
import { useTodoStore } from "@/stores/todo.js"
export default {
	name: "HomeView",
	computed: {
		...mapStores(useTodoStore),
	},
}
</script>

<style scoped>
.min-width-max-content {
	min-width: max-content;
}
</style>
