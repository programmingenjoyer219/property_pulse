<script>
	export let property;
	$: ({
		id,
		name,
		type,
		street,
		city,
		state,
		zipcode,
		beds,
		baths,
		square_feet,
		nightly_rate,
		weekly_rate,
		monthly_rate,
		images,
	} = property);

	function displayRate() {
		if (nightly_rate) {
			return "$" + nightly_rate + "/nt";
		} else if (weekly_rate) {
			return "$" + weekly_rate + "/wk";
		} else {
			return "$" + monthly_rate + "/mt";
		}
	}
</script>

<div class="bg-gray-50 rounded-xl shadow-md">
	<!-- image -->
	<div
		class="relative h-[200px] rounded-t-xl"
		style="background: url({images[0]}) center center / cover no-repeat;"
	>
		<!-- rate -->
		<span
			class="absolute top-4 left-4 bg-gray-50 font-bold text-blue-600 p-2 rounded-md sm:text-lg"
			>{displayRate()}</span
		>

		<!-- wishlist button -->
		<!-- <button
			class="absolute top-4 right-4 bg-gray-50 rounded-full px-[8.5px] py-1 text-gray-400 hover:text-red-400 transition-all duration-200"
		>
			<i class="ri-heart-fill text-lg"></i>
		</button> -->
	</div>
	<!-- details -->
	<div class="p-4 flex flex-col gap-2">
		<p class="font-medium text-xl">{name}</p>

		<p class="">{type}</p>

		<div class="space-x-2">
			<i class="ri-map-pin-2-fill text-lg text-red-500"></i>
			<span class="sm:text-lg">{city} {state}</span>
		</div>

		<a
			class="btn-primary flex items-center justify-center gap-2 hover:gap-4"
			href="/properties/{id}"
		>
			<span>Details</span>
			<i class="ri-arrow-right-line"></i>
		</a>
	</div>
</div>
