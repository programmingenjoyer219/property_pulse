<script>
	import Message from "$components/Message.svelte";
	import CustomHeader from "$components/CustomHeader.svelte";
	export let data;
</script>

<CustomHeader>
	<div class="flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl">
		<h1 class="font-extrabold">Messages</h1>
		<i class="ri-message-2-fill"></i>
	</div>
</CustomHeader>

<section class="section bg-gray-50">
	<div
		class="container mx-auto max-w-3xl py-4 px-2 sm:px-6 rounded-md bg-white shadow-md flex flex-col gap-4"
	>
		{#if data?.error}
			<p class="text-red-500 font-medium text-xl">{data?.error}</p>
		{:else if data?.messages.length === 0}
			<div class="text-center text-gray-400/75 space-y-4">
				<i class="ri-message-2-line text-9xl"></i>
				<p class="text-3xl font-semibold">No messages</p>
			</div>
		{:else}
			{#each data?.messages as message}
				<Message {message} />
			{/each}
		{/if}
	</div>
</section>
