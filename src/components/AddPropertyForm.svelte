<script>
	import Loader from "$components/Loader.svelte";
	import { goto } from "$app/navigation";

	let loading = false;

	let selectedAmenities = [];

	let validationResult = { isValidated: true, failureDueTo: {} };

	const amenities = [
		"Wifi",
		"Free Parking",
		"24/7 Security",
		"Dishwasher",
		"Balcony / Patio",
		"Full Kitchen",
		"Swimming Pool",
		"Wheelchair Accessible",
		"Gym / Fitness Center",
		"Smart TV",
		"Washer & Dryer",
		"Hot Tub",
		"Elevator Access",
		"Air Conditioning",
		"Coffee Maker",
	];

	const propertyTypes = [
		"Apartment",
		"Condo",
		"House",
		"Cottage or Cabin",
		"Room",
		"Studio",
		"Other",
	];

	async function handleSubmit(e) {
		loading = true;
		const form = e.target;
		const formData = new FormData(form);
		const response = await fetch("/api/properties", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();
		const property_url = result.property_url;
		validationResult = result.validationResult;

		if (validationResult.isValidated) {
			form.reset();
		}

		loading = false;

		if (!!property_url) {
			goto(property_url);
		}
	}
</script>

<Loader {loading} />

<form on:submit|preventDefault={handleSubmit} class="space-y-6 sm:text-lg">
	<!-- owner_email -->
	<!-- <input
		type="text"
		name="owner_email"
		id="owner_id"
		value={session?.user?.email}
		hidden
	/> -->

	<!-- type -->
	<div class="flex flex-col gap-2">
		<label for="type" class="text-gray-700 font-bold"> Property Type </label>
		<select
			id="type"
			name="type"
			class="border rounded-md outline-blue-500 w-full p-2"
		>
			{#each propertyTypes as propertyType}
				<option value={propertyType}>{propertyType}</option>
			{/each}
		</select>
	</div>

	<!-- name -->
	<div class="flex flex-col gap-2">
		<label for="name" class="text-gray-700 font-bold"
			>Listing Name <span class="required">*</span></label
		>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["name"]}
			<p class="error">{validationResult?.failureDueTo["name"]}</p>
		{/if}
		<input
			type="text"
			id="name"
			name="name"
			class="border outline-blue-500 rounded-md p-2"
			placeholder="eg. Beautiful Apartment In Miami"
		/>
	</div>

	<!-- description -->
	<div class="flex flex-col gap-2">
		<label for="description" class="text-gray-700 font-bold"
			>Description <span class="required">*</span></label
		>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["description"]}
			<p class="error">{validationResult?.failureDueTo["description"]}</p>
		{/if}
		<textarea
			id="description"
			name="description"
			class="border outline-blue-500 rounded-md p-2"
			rows="4"
			placeholder="Add an optional description of your property"
		></textarea>
	</div>

	<!-- location -->
	<div class="flex flex-col gap-2">
		<label for="location" class="text-gray-700 font-bold"
			>Location <span class="required">*</span></label
		>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["street"]}
			<p class="error">{validationResult?.failureDueTo["street"]}</p>
		{/if}
		<input
			type="text"
			id="street"
			name="street"
			class="border rounded-md outline-blue-500 w-full p-2"
			placeholder="Street"
		/>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["city"]}
			<p class="error">{validationResult?.failureDueTo["city"]}</p>
		{/if}
		<input
			type="text"
			id="city"
			name="city"
			class="border rounded-md outline-blue-500 w-full p-2"
			placeholder="City"
		/>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["state"]}
			<p class="error">{validationResult?.failureDueTo["state"]}</p>
		{/if}
		<input
			type="text"
			id="state"
			name="state"
			class="border rounded-md outline-blue-500 w-full p-2"
			placeholder="State"
		/>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["zipcode"]}
			<p class="error">{validationResult?.failureDueTo["zipcode"]}</p>
		{/if}
		<input
			type="text"
			id="zipcode"
			name="zipcode"
			class="border rounded-md outline-blue-500 w-full p-2"
			placeholder="Zipcode"
		/>
	</div>

	<!-- beds, baths and square_feet -->
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-1">
			<label for="beds" class="text-gray-700 font-bold"
				>Beds <span class="required">*</span></label
			>
			{#if !validationResult.isValidated && validationResult?.failureDueTo["beds"]}
				<p class="error">{validationResult?.failureDueTo["beds"]}</p>
			{/if}
			<input
				type="number"
				id="beds"
				name="beds"
				min="1"
				step="1"
				class="border rounded-md outline-blue-500 p-2"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="baths" class="text-gray-700 font-bold"
				>Baths <span class="required">*</span></label
			>
			{#if !validationResult.isValidated && validationResult?.failureDueTo["baths"]}
				<p class="error">{validationResult?.failureDueTo["baths"]}</p>
			{/if}
			<input
				type="number"
				id="baths"
				name="baths"
				min="1"
				step="1"
				class="border rounded-md outline-blue-500 p-2"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="square_feet" class="text-gray-700 font-bold"
				>Square Feet <span class="required">*</span></label
			>
			{#if !validationResult.isValidated && validationResult?.failureDueTo["square_feet"]}
				<p class="error">{validationResult?.failureDueTo["square_feet"]}</p>
			{/if}
			<input
				type="number"
				id="square_feet"
				name="square_feet"
				min="1"
				step="1"
				class="border rounded-md outline-blue-500 p-2"
			/>
		</div>
	</div>

	<!-- amenities -->
	<div class="flex flex-col gap-2">
		<label for="amenities" class="block text-gray-700 font-bold mb-2"
			>Amenities</label
		>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
			{#each amenities as amenity}
				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						name={amenity}
						value={amenity}
						bind:group={selectedAmenities}
						class="size-6 cursor-pointer"
					/>
					<span class="">{amenity}</span>
				</div>
			{/each}
		</div>
		<input type="text" name="amenities" value={selectedAmenities} hidden />
	</div>

	<!-- rates -->
	<div class="flex flex-col gap-2">
		<label for="rates" class="text-gray-700 font-bold"
			>Rates <span class="required">*</span> (Leave blank if not applicable)</label
		>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["rates"]}
			<p class="error">{validationResult?.failureDueTo["rates"]}</p>
		{/if}
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="nightly_rate">Nightly</label>
				<input
					type="number"
					id="nightly_rate"
					name="nightly_rate"
					class="border outline-blue-500 rounded-md w-full p-2"
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="weekly_rate">Weekly</label>
				<input
					type="number"
					id="weekly_rate"
					name="weekly_rate"
					class="border outline-blue-500 rounded-md w-full p-2"
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="monthly_rate">Monthly</label>
				<input
					type="number"
					id="monthly_rate"
					name="monthly_rate"
					class="border outline-blue-500 rounded-md w-full p-2"
				/>
			</div>
		</div>
	</div>

	<!-- images -->
	<div class="flex flex-col gap-2">
		<label for="images" class="text-gray-700 font-bold"
			>Images <span class="required">*</span> (Select 3 to 4 images)</label
		>
		{#if !validationResult.isValidated && validationResult?.failureDueTo["images"]}
			<p class="error">{validationResult?.failureDueTo["images"]}</p>
		{/if}
		<input
			type="file"
			id="images"
			name="images"
			class="btn-file"
			accept="image/*"
			multiple
			disabled={loading}
		/>
	</div>

	<!-- submit button -->
	{#if !validationResult.isValidated && validationResult?.failureDueTo["server"]}
		<p class="error">{validationResult?.failureDueTo["server"]}</p>
	{/if}
	<div class="flex justify-center">
		<button class="btn-primary" type="submit" disabled={loading}>
			{#if loading}
				<span>Adding Property...</span>
			{:else}
				<span>Add Property</span>
			{/if}
		</button>
	</div>
</form>

<style>
	.btn-file {
		@apply file:transition-all file:duration-200 file:rounded-md file:px-4 file:py-2
		file:space-x-1 file:border-2 file:border-gray-500/75 file:text-gray-500/75
		file:disabled:cursor-not-allowed file:disabled:opacity-50 file:cursor-pointer 
		file:bg-white file:hover:bg-blue-100 file:hover:border-blue-500 
		file:hover:text-blue-500;
	}
</style>
