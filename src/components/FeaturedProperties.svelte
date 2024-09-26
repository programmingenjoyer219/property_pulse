<script>
	import PropertyCard from "$components/PropertyCard.svelte";

	export let properties = [];
</script>

{#if properties.length}
	<section class="section bg-blue-100">
		<div class="container-mod space-y-8">
			<h3 class="text-2xl sm:text-4xl font-bold text-blue-600 text-center">
				Featured Properties
			</h3>
			<div
				class="grid grid-rows-2 gap-6 sm:gap-10 sm:grid-rows-1 sm:grid-cols-2"
			>
				{#each properties as property (property.id)}
					<PropertyCard {property} />
				{/each}
			</div>
		</div>
	</section>
{/if}
