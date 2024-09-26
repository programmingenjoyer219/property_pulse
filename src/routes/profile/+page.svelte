<script>
	import UserListingsCard from "$components/UserListingsCard.svelte";
	import CustomHeader from "$components/CustomHeader.svelte";
	export let data;

	$: ({ session, properties, error } = data);
	$: name = session?.user?.name ?? "John Doe";
	$: email = session?.user?.email ?? "JDoe@gmail.com";
	$: picture =
		session?.user?.image ??
		`https://ui-avatars.com/api/?name=${name}&color=fff&background=ec5252`;
</script>

<CustomHeader>
	<div class="flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl">
		<h1 class="font-extrabold">Your Profile</h1>
		<i class="ri-user-fill"></i>
	</div>
</CustomHeader>

<section class="section bg-gray-50">
	<div
		class="container mx-auto max-w-3xl py-4 px-2 sm:px-6 bg-white rounded-md shadow-md flex flex-col gap-4"
	>
		<!-- user info -->
		<div class="flex flex-col gap-2">
			<img src={picture} alt="" class="size-10 rounded-full" />
			<div class="flex items-center gap-2 flex-wrap">
				<span class="font-medium text-gray-800">Name: </span><span>{name}</span>
			</div>
			<div class="flex items-center gap-2 flex-wrap">
				<span class="font-medium text-gray-800">Email: </span><span
					>{email}</span
				>
			</div>
		</div>
		<!-- user listings -->
		<h2 class="text-2xl font-bold text-blue-700">Your listings :</h2>
		{#if error}
			<p class="text-red-500 font-medium text-xl">{error}</p>
		{:else if properties.length === 0}
			<div class="text-center text-gray-400/75 space-y-4">
				<i class="ri-home-2-fill text-9xl"></i>
				<p class="text-3xl font-semibold">No property listings</p>
			</div>
		{:else}
			{#each properties as property}
				<UserListingsCard {property} />
			{/each}
		{/if}
	</div>
</section>
