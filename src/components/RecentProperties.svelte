<script>
	import PropertyCard from "$components/PropertyCard.svelte";

	export let properties = [];
</script>

<section class="section">
	<div class="container-mod space-y-8">
		<h3 class="text-2xl sm:text-4xl font-bold text-blue-600 text-center">
			Recent Properties
		</h3>

		<div class="grid grid-cols-1 gap-6 sm:gap-10 sm:grid-cols-2">
			{#each properties as property (property.id)}
				<PropertyCard {property} />
			{/each}
		</div>

		<div class="flex items-center justify-center">
			<a
				href="/properties"
				class="text-center py-3 px-8 rounded-md sm:text-lg text-gray-50 bg-blue-600 hover:bg-blue-800 transition-all duration-200"
				>View All Properties</a
			>
		</div>
	</div>
</section>
