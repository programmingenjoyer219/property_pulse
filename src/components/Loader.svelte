<script>
	export let loading = false;
</script>

{#if loading}
	<div
		class="z-20 fixed top-0 left-0 h-full w-full bg-blue-600/50 flex items-center justify-center"
	>
		<div
			class="size-[100px] p-4 rounded-full bg-blue-500 shadow-md flex items-center justify-center"
		>
			<i class="ri-loader-fill text-5xl animate-spin text-gray-50"></i>
		</div>
	</div>
{/if}
