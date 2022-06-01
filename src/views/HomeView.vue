<script setup>
//import ElectronApi from "@/components/ElectronApi.vue"
</script>

<template>
	<div class="my-2 d-flex justify-content-end">
		<AddTodoButton />
	</div>

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
				<button class="btn btn-sm btn-secondary" @click="remove(todo.id)">Remove</button>
			</div>
		</div>
	</div>
	<!-- <main>
		<ElectronApi />
	</main> -->
</template>

<script>
import { mapStores } from "pinia"
import { useTodoStore } from "@/stores/todo.js"
import AddTodoButton from "../components/AddTodoButton.vue"
export default {
	name: "HomeView",
	computed: {
		...mapStores(useTodoStore),
	},
	components: {
		AddTodoButton,
	},
	methods: {
		remove(id) {
			this.todoStore.remove(id)
		},
	},
}
</script>

<style>
.min-width-max-content {
	min-width: max-content;
}
</style>
