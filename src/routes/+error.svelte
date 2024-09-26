<script>
	import { page } from "$app/stores";

	$: ({ error, status } = $page);
</script>

<section class="section bg-gray-50">
	<div
		class="container p-4 mx-auto max-w-2xl bg-white rounded-md shadow-lg flex flex-col items-center justify-center gap-4"
	>
		<h1 class="text-6xl font-bold text-gray-700">{status}</h1>
		<i class="ri-error-warning-fill text-yellow-400 text-9xl"></i>
		<p class="font-medium text-2xl text-gray-700">{error?.message}</p>
		<a class="btn-primary" href="/">Go back to home page</a>
	</div>
</section>
