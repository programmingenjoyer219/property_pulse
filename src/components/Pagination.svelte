<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	$: ({ paginationData } = $page.data);
	$: currentPage = paginationData?.page ?? 1;
	$: numPages = paginationData?.numPages ?? 1;
</script>

<div
	class="grid grid-cols-3 place-items-center gap-4 w-fit mx-auto text-center rounded-md bg-blue-100"
>
	<!-- prev -->
	<button
		on:click={() => {
			if (currentPage > 1) goto(`/properties?page=${currentPage - 1}`);
		}}
		disabled={currentPage <= 1}
		class="btn-change-page"
	>
		<i class="ri-arrow-left-line"></i>
	</button>

	<span class="font-mono text-lg font-medium text-blue-600">{currentPage}</span>

	<!-- next -->
	<button
		on:click={() => {
			if (currentPage < numPages) goto(`/properties?page=${currentPage + 1}`);
		}}
		disabled={currentPage >= numPages}
		class="btn-change-page"
	>
		<i class="ri-arrow-right-line"></i>
	</button>
</div>

<style>
	.btn-change-page {
		@apply px-4 py-1 rounded-md shadow-md
		active:bg-opacity-50
    bg-blue-600 text-gray-50 text-lg
    disabled:bg-gray-500/75 disabled:cursor-not-allowed;
	}
</style>
