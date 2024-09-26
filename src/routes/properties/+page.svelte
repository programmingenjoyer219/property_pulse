<script>
	import Hero from "$components/Hero.svelte";
	import PropertyCard from "$components/PropertyCard.svelte";
	import Pagination from "$components/Pagination.svelte";
	export let data;

	$: keywords = getKeywords(data?.properties);

	function getKeywords(properties) {
		let keywords = "";

		if (!!properties) {
			for (const property of data?.properties) {
				keywords += `${property.name}, ${property.street}, ${property.city}, ${property.state}, ${property.zipcode}, `;
			}
		}

		keywords +=
			"rental properties, find apartments, house rentals, PropertyPulse";

		return keywords;
	}
</script>

<svelte:head>
	<title>Properties</title>
	<meta name="keywords" content={keywords} />
	<meta
		name="description"
		content="Easily find and apply for your perfect rental property with PropertyPulse."
	/>
</svelte:head>

<Hero />

<section class="section">
	<div class="container-mod space-y-8">
		<div class="grid grid-cols-1 gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each data?.properties as property (property.id)}
				<PropertyCard {property} />
			{/each}
		</div>

		<Pagination />
	</div>
</section>
