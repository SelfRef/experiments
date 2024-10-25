<template>
	<div>
		<table>
			<tr>
				<th>Doc name</th>
				<th>Expected headings</th>
				<th>Generated headings</th>
			</tr>
			<tr v-for="note in notes" :class="{bad: note.headingsInFile !== note.headings.length}">
				<td>{{ note.name }}</td>
				<td>{{ note.headingsInFile }}</td>
				<td>{{ note.headings.length }}</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts" setup>
const notes = ref([])

onMounted(async () => {
	notes.value = await $fetch('/api/docs')
})

</script>

<style>
table, th, td {
	border: 1px solid black;
}

.bad {
	color: red;
}
</style>