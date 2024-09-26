<script>
	import Hero from "$components/Hero.svelte";
	import FeaturedProperties from "$components/FeaturedProperties.svelte";
	import RecentProperties from "$components/RecentProperties.svelte";
	import { SignIn } from "@auth/sveltekit/components";

	export let data;
</script>

<svelte:head>
	<title>PropertyPulse - Discover Your Perfect Rental</title>
	<meta
		name="keywords"
		content="rental properties, find apartments, house rentals, PropertyPulse"
	/>
	<meta
		name="description"
		content="Easily find and apply for your perfect rental property with PropertyPulse."
	/>
</svelte:head>

<Hero />

<section class="section">
	<div class="container-mod">
		<div class="grid grid-rows-2 gap-6 sm:gap-10 sm:grid-rows-1 sm:grid-cols-2">
			<!-- for renters -->
			<div class="rounded-md p-6 shadow-md bg-gray-100">
				<h2 class="text-2xl font-bold text-gray-800 mb-4 sm:text-3xl">
					For Renters
				</h2>
				<p class="mb-6 sm:text-lg">
					Find your dream rental property. Bookmark properties and contact
					owners.
				</p>

				<a href="/properties" class="btn-primary">Browse Properties</a>
			</div>
			<!-- for property owners -->
			<div class="rounded-md p-6 shadow-md bg-blue-100">
				<h2 class="text-2xl font-bold text-gray-800 mb-4 sm:text-3xl">
					For Property Owners
				</h2>
				<p class="mb-4 sm:text-lg">
					List your properties and reach potential tenants. Rent as an airbnb or
					a long term rental.
				</p>
				{#if !!data?.session}
					<a href="/add" class="btn-primary">Add Property</a>
				{:else}
					<SignIn class="w-fit">
						<div slot="submitButton" class="btn-primary">
							<i class="ri-google-fill"></i>
							<span>Login To Add Properties</span>
						</div>
					</SignIn>
				{/if}
			</div>
		</div>
	</div>
</section>

<FeaturedProperties properties={data?.featuredProperties} />

<RecentProperties properties={data?.recentProperties} />
