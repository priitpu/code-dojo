<script lang="ts">
	import type { GridItem } from '$lib/grid-item.model';
	export let items: GridItem[];
	$: itemsLength = items?.length;
	function isFullWidth(i: number) {
		if (itemsLength <= 1 || itemsLength % 2 === 0) {
			return false;
		}
		return itemsLength - 1 === i && i % 1 === 0;
	}
</script>

<div class="grid">
	{#each items as { component, ...item }, i}
		<div class:grid__item--full-width={isFullWidth(i)}>
			<svelte:component this={component} {item} alternate={isFullWidth(i)} />
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}

	.grid__item--full-width {
		grid-column: span 2;
	}
</style>
