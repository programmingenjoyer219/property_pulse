<script>
	import AddPropertyForm from "$components/AddPropertyForm.svelte";
	import CustomHeader from "$components/CustomHeader.svelte";
</script>

<CustomHeader>
	<div class="flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl">
		<h1 class="font-extrabold">Add Property</h1>
		<i class="ri-community-fill"></i>
	</div>
</CustomHeader>

<section class="section bg-gray-50">
	<div
		class="container mx-auto max-w-3xl py-4 px-2 sm:px-6 bg-white rounded-md shadow-md space-y-8"
	>
		<AddPropertyForm />
	</div>
</section>
