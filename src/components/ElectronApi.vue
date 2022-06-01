<template>
	<div>Number of CPUs: {{ cpuCount }}</div>
</template>
<script>
export default {
	name: "ElectronApi",
	computed: {
		cpuCount() {
			return window.api.cpuCount()
		},
	},
}
</script>
