<script>
	import { invalidate } from "$app/navigation";
	export let message;

	$: ({
		id,
		marked_as_read,
		properties: { name: property_name },
		content,
		sender_name,
		sender_email,
		sender_phone_number,
		created_at: received_at,
	} = message);

	let loading = false;

	function formatDate(dateString) {
		const date = new Date(dateString);

		const day = date.getUTCDate();
		const month = date.getUTCMonth() + 1; // Months are zero-based
		const year = date.getUTCFullYear();
		let hours = date.getUTCHours();
		const minutes = date.getUTCMinutes();

		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12 || 12; // Convert to 12-hour format

		// Format day and month with leading zeros if necessary
		const formattedDay = day < 10 ? `0${day}` : day;
		const formattedMonth = month < 10 ? `0${month}` : month;

		// Format minutes with leading zeros
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${formattedMonth}/${formattedDay}/${year} ${hours}:${formattedMinutes}${ampm}`;
	}

	async function changeMessageStatus() {
		loading = true;
		const response = await fetch("/api/messages", {
			method: "POST",
			body: JSON.stringify({ message_id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (result.success) {
			marked_as_read = !marked_as_read;
			invalidate("app:messages");
		}
		loading = false;
	}

	async function deleteMessage() {
		loading = true;
		const response = await fetch("/api/deleteMessage", {
			method: "DELETE",
			body: JSON.stringify({ message_id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (result.success) {
			invalidate("app:messages");
		}
		loading = false;
	}
</script>

<div class="relative flex flex-col gap-2 rounded-md border-2 p-2">
	{#if !marked_as_read}
		<div
			class="absolute -top-3 -right-3 size-6 rounded-full bg-green-500 animate-pulse"
		></div>
	{/if}

	<div class="flex flex-col gap-2 text-xl sm:text-2xl sm:flex-row">
		<span class="font-semibold">Property Inquiry:</span>
		<span>{property_name}</span>
	</div>

	<p>{content}</p>

	<div class="flex flex-col gap-1 text-gray-800">
		<div class="flex items-center gap-2">
			<i class="ri-user-fill text-blue-500"></i>
			<span>{sender_name}</span>
		</div>

		<div class="flex items-center gap-2">
			<i class="ri-mail-fill text-blue-500"></i>
			<span>{sender_email}</span>
		</div>

		<div class="flex items-center gap-2">
			<i class="ri-phone-fill text-blue-500"></i>
			<span>{sender_phone_number}</span>
		</div>

		<div class="flex items-center gap-2">
			<span class="font-semibold">Received at:</span>
			<span>{formatDate(received_at)}</span>
		</div>
	</div>

	<div class="flex flex-col gap-2 sm:flex-row">
		<input type="text" name="message_id" value={id} hidden />

		<button
			on:click={changeMessageStatus}
			disabled={loading}
			class="disabled:cursor-not-allowed disabled:bg-opacity-75 {marked_as_read
				? 'rounded-md px-4 py-2 bg-gray-400/75 space-x-1 text-gray-50 hover:bg-gray-400'
				: 'rounded-md px-4 py-2 bg-blue-500 hover:bg-blue-700 space-x-1 text-gray-50'}"
		>
			{#if loading}
				<i class="ri-loader-4-line text-lg animate-spin"></i>
				<span>{marked_as_read ? "Marking As Unread" : "Marking As Read"}</span>
			{:else}
				<i class="ri-check-double-line text-lg"></i>
				<span>{marked_as_read ? "Mark As Unread" : "Mark As Read"}</span>
			{/if}
		</button>

		<button
			disabled={loading}
			on:click={deleteMessage}
			class="disabled:cursor-not-allowed disabled:bg-opacity-75 rounded-md px-4 py-2 bg-red-500 hover:bg-red-700 space-x-1 text-gray-50"
		>
			<i class="ri-delete-bin-6-fill text-lg"></i>
			<span>Delete</span>
		</button>
	</div>
</div>
