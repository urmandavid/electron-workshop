<template>
	<button type="button" class="btn btn-primary" @click="modal.show()">Add todo</button>
	<div class="modal fade" ref="addTodoModal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Add new todo item</h5>
					<button type="button" class="btn-close" data-bs- dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<form>
						<div class="mb-2">
							<label :for="`${id}-title`" class="form- label">Title</label>
							<input type="text" class="form-control" :id="`${id}-title`" v-model="title" />
						</div>

						<div class="mb-2">
							<label :for="`${id}-date`" class="form-label">Done by</label>
							<input type="date" class="form-control" :id="`${id}-date`" v-model="date" />
						</div>

						<div class="mb-2">
							<label :for="`${id}-description`" class="form- label">Description</label>
							<textarea class="form-control" :id="`${id}-description`" rows="3" v-model="description"></textarea>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs- dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" @click="addTodo">Add todo</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import uuid4 from "uuid4"
import { Modal } from "bootstrap"
import { mapStores } from "pinia"
import { useTodoStore } from "@/stores/todo.js"
export default {
	data() {
		return {
			modal: {},
			id: uuid4(),
			title: "",
			date: "",
			description: "",
		}
	},
	computed: {
		...mapStores(useTodoStore),
	},
	mounted() {
		this.modal = new Modal(this.$refs.addTodoModal)
	},
	methods: {
		addTodo() {
			this.todoStore.add(this.title, this.date, this.description)
			this.modal.hide()
			this.title = ""
			this.date = ""
			this.description = ""
		},
	},
}
</script>
