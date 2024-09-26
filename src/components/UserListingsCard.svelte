<script>
	import { invalidate, goto } from "$app/navigation";
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

	let result = { success: true, error: null };

	let loading = false;

	async function deleteProperty() {
		loading = true;
		if (!confirm(`Are you sure you want to delete the property : ${name}`)) {
			loading = false;
			return;
		}

		const response = await fetch("/api/properties", {
			method: "DELETE",
			body: JSON.stringify({ property_id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		result = await response.json();

		if (result.success) invalidate("app:profile");
		loading = false;
	}
</script>

<div class="flex flex-col gap-2 rounded-md border-2 p-2">
	<div
		class="h-[6rem]"
		style="background: url({images[0]}) center center / cover no-repeat;"
	></div>
	<p class="text-xl font-medium">{name}</p>
	<p>{street}, {city}, {state} - {zipcode}</p>

	{#if !result.success}
		<p class="error">{result.error}</p>
	{/if}

	<div class="flex flex-wrap gap-2">
		<button
			on:click={() => goto(`/properties/${id}`)}
			disabled={loading}
			class="btn-secondary hover:bg-green-100 hover:border-green-500 hover:text-green-500 text-gray-500/75"
		>
			<i class="ri-eye-fill text-lg"></i>
			<span>View</span>
		</button>

		<button
			on:click={() => goto(`/edit/${id}`)}
			disabled={loading}
			class="btn-secondary hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 text-gray-500/75"
		>
			<i class="ri-edit-fill text-lg"></i>
			<span>Edit</span>
		</button>

		<button
			on:click={deleteProperty}
			disabled={loading}
			class="btn-secondary hover:bg-red-100 hover:border-red-500 hover:text-red-500 text-gray-500/75"
		>
			{#if loading}
				<i class="ri-delete-bin-6-fill text-lg animate-pulse text-red-500"></i>
				<span class="animate-pulse text-red-500">Deleting...</span>
			{:else}
				<i class="ri-delete-bin-6-fill text-lg"></i>
				<span>Delete</span>
			{/if}
		</button>
	</div>
</div>
