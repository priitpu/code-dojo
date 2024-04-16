<script lang="ts">
	import type { CardProps } from '$lib/card.model';
	import pic from '$lib/assets/onnelik.png';
	export let item: CardProps;
	// TODO: Punish designer
	export let alternate: boolean;
</script>

<div class="card" class:card--alternate={alternate}>
	<div class="card__header">
		<img class="card__image" src={pic} alt="Õnnelik kata reviewer nähes oma pilti" />
		<div class="card__info">
			<span>
				{item?.name}
			</span>
			<span>
				{item?.position}
			</span>
		</div>
	</div>
	<div class="card__contents">
		<span class="card__title">{item.title}</span>
		<p>{item.contents}</p>
	</div>
</div>

<style>
	.card {
		padding: 30px 24px;
		color: var(--color-white);
		display: flex;
		flex-direction: column;
		gap: 32px;
		background-color: var(--color-medium-gray);
	}

	.card--alternate {
		--card-contents-left-padding: 119px;
		--card-image-size: 95px;
	}

	.card__header {
		display: grid;
		grid-template-columns: var(--card-image-size, 70px) 1fr;
		gap: 24px;
	}

	.card__image {
		width: var(--card-image-size, 70px);
		height: var(--card-image-size, 70px);
		border-radius: 100px;
		object-fit: none;
	}

	.card__info {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-self: center;
		font-weight: 700;
		font-size: 1.5rem;
	}

	.card__title {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.card__contents {
		display: flex;
		flex-direction: column;
		gap: 24px;
		font-weight: 600;
		padding-left: var(--card-contents-left-padding);
	}
</style>
