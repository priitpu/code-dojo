<script lang="ts">
	import Card from '$components/card/Card.svelte';
	import Grid from '$components/grid/Grid.svelte';
	const baseItem = {
		name: 'Some Dude',
		position: 'Idk tbh',
		title: 'Lorem ipsum dolor sit amet.',
		contents:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempore iusto quos, tempora nam quo?',
		component: Card
	};

	const items = $state(Array(3).fill(baseItem));

	function addItem(): void {
		items.push(baseItem);
	}

	function removeLast(): void {
		items.splice(-1);
	}
</script>

<button on:click={addItem}>Add</button>
<button on:click={removeLast}>Remove last</button>
<section class="grid-section">
	<Grid {items}></Grid>
</section>

<style>
	.grid-section {
		padding: 24px;
		background-color: var(--color-dark-gray);
	}
</style>
