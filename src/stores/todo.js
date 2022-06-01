import { defineStore } from "pinia"

export const useTodoStore = defineStore({
	id: "todo",
	state: () => ({
		items: [
			{
				id: "fd44a271-6fbb-4e49-9103-a1ac7e9b1666",
				date: "2022-05-02",
				title: "Skura köket",
				description: "Skura hela köket så det blir riktigt bra",
			},
			{
				id: "fd44a271-6fbb-4e49-9103-a1ac7e9b1667",
				date: "2022-05-01",
				title: "Dammsuga köket",
				description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quo!",
			},
			{
				id: "fd44a271-6fbb-4e49-9103-a1ac7e9b1668",
				date: "2022-05-03",
				title: "Lorem ipsum!",
				description: "Perspiciatis incidunt eveniet necessitatibus quaerat corporis earum illum!",
			},
		],
	}),
	actions: {
		add(title, date, description) {
			// generate a unique id for each todo item to enable
			// simple removal
			let todo = {
				id: uuid4(),
				title,
				date,
				description,
			}
			this.items.push(todo)
		},
		remove(id) {
			this.items = this.items.filter((i) => i.id != id)
		},
	},
})
