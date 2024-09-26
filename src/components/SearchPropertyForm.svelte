<script>
	import { goto } from "$app/navigation";

	const propertyTypes = [
		"Apartment",
		"Condo",
		"House",
		"Cottage or Cabin",
		"Room",
		"Studio",
		"Other",
	];

	function handleSubmit(e) {
		const form = e.target;
		const formData = new FormData(form);

		const searchQuery = formData.get("searchQuery");
		const type = formData.get("type");

		form.reset();

		goto(`/properties?page=1&query=${searchQuery}&type=${type}`);
	}
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="grid grid-cols-1 grid-rows-3 gap-4 sm:flex sm:items-stretch"
>
	<input
		class="p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-300 sm:w-2/6 flex-1"
		type="text"
		name="searchQuery"
		placeholder="Enter location (City, State, Zip, etc...)"
	/>

	<select
		name="type"
		class="p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-300 flex-1"
	>
		{#each propertyTypes as propertyType}
			<option value={propertyType}>{propertyType}</option>
		{/each}
	</select>

	<button type="submit" class="btn-primary border border-blue-300 space-x-2">
		<i class="ri-search-line"></i>
		<span>Search</span>
	</button>
</form>
