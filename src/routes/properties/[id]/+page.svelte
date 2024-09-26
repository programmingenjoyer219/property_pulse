<script>
	import ContactForm from "$components/ContactForm.svelte";
	import ImageGallery from "$components/ImageGallery.svelte";
	import ShareButtons from "$components/ShareButtons.svelte";
	import { page } from "$app/stores";
	import Map from "$components/Map.svelte";

	export let data;
	export let form;

	$: ({
		session,
		property: {
			id,
			name,
			description,
			type,
			street,
			city,
			state,
			zipcode,
			amenities,
			beds,
			baths,
			square_feet,
			nightly_rate,
			weekly_rate,
			monthly_rate,
			images,
			owner_email,
		},
	} = data);

	$: shareUrl = $page.url.href;
</script>

<svelte:head>
	<title>{name}</title>
	<meta
		name="keywords"
		content="{type}, {street}, {city}, {state}, {zipcode}, rental properties, find apartments, house rentals, PropertyPulse"
	/>
	<meta name="description" content={description} />
</svelte:head>

<section class="section bg-gray-50">
	<div class="container-mod space-y-4">
		<!-- property name, share and save buttons -->
		<div
			class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
		>
			<h1 class="text-2xl sm:text-4xl font-medium text-gray-800">{name}</h1>
			<div class="flex gap-6">
				<ShareButtons {shareUrl} />

				<!-- <button
					class="btn-secondary text-gray-500/75 hover:bg-red-100 hover:text-red-500 hover:border-red-500"
				>
					<i class="ri-heart-fill"></i>
					<span class="font-medium">Save</span>
				</button> -->
			</div>
		</div>

		<ImageGallery {images} />

		<!-- property info, map and contact-form -->
		<div class="custom-grid">
			<div class="space-y-4">
				<!-- address -->
				<h2 class="text-lg sm:text-2xl font-medium text-gray-800">
					{street},
					{city},
					{state} -
					{zipcode}
				</h2>

				<!-- price and details -->
				<div
					class="flex gap-4 flex-wrap sm:items-center text-gray-800 sm:text-lg"
				>
					<div class="flex items-center gap-2">
						<span class="">Nightly: </span>
						<span class="font-medium"
							>{nightly_rate ? "$" + nightly_rate : "N/A"}</span
						>
					</div>
					<div class="flex items-center gap-2">
						<span class="">Weekly: </span>
						<span class="font-medium"
							>{weekly_rate ? "$" + weekly_rate : "N/A"}</span
						>
					</div>
					<div class="flex items-center gap-2">
						<span class="">Monthly: </span>
						<span class="font-medium"
							>{monthly_rate ? "$" + monthly_rate : "N/A"}</span
						>
					</div>
				</div>
				<div class="division-line"></div>

				<!-- details -->
				<div
					class="flex gap-4 flex-wrap sm:items-center text-blue-700 sm:text-lg"
				>
					<div class="flex items-center gap-2">
						<i class="ri-hotel-bed-fill"></i>
						<span class="font-medium">{beds} Beds</span>
					</div>
					<div class="flex items-center gap-2">
						<i class="ri-showers-fill"></i>
						<span class="font-medium">{baths} Baths</span>
					</div>
					<div class="flex items-center gap-2">
						<i class="ri-ruler-2-fill"></i>
						<span class="font-medium">{square_feet} sqft</span>
					</div>
				</div>
				<!-- description -->
				<p class="text-gray-500">{description}</p>

				<!-- amenities -->
				<ul class="grid sm:grid-cols-2 gap-1">
					{#each amenities as amenity}
						<li class="flex gap-2">
							<i class="ri-checkbox-circle-fill text-green-600"></i>
							<span>{amenity}</span>
						</li>
					{/each}
				</ul>
				<div class="division-line"></div>

				<!-- map -->
				<h3 class="text-xl font-medium text-gray-800">Where you'll be</h3>
				<div class="flex items-center gap-2">
					<i class="ri-map-pin-fill text-red-500"></i>
					<p class="text-gray-800">
						{street},
						{city},
						{state} -
						{zipcode}
					</p>
				</div>
				<div class="mt-6">
					<Map {street} {city} {state} {zipcode} />
				</div>
				<div class="division-line md:hidden"></div>
			</div>

			<!-- contact-form -->
			<ContactForm
				{session}
				{form}
				property_id={id}
				receiver_email={owner_email}
			/>
		</div>
	</div>
</section>

<style>
	.custom-grid {
		@apply flex flex-col gap-4;
	}

	.division-line {
		@apply h-0.5 bg-gray-300;
	}

	@media (min-width: 768px) {
		.custom-grid {
			display: grid;
			grid-template-columns: 3fr 2fr;
			gap: 1rem;
		}
	}
</style>
