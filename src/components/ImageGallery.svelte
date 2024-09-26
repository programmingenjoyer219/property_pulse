<script>
	export let images;
</script>

{#if !!images}
	<div class="snap-x snap-mandatory overflow-x-auto flex gap-2 rounded-md">
		{#each images as image, index}
			<div class="snap-start scroll-mx-4 shrink-0">
				<img
					src={image}
					alt="image-{index}"
					class="rounded-md w-[80vw] sm:w-[60vw]"
				/>
			</div>
		{/each}
	</div>
{/if}

<!-- <div class="hidden sm:grid grid-cols-2 gap-4">
		{#each images as image, index}
			<img
				src="/images/{image}"
				alt="image-{index}"
				class="{images.length === 3 && index === 2
					? 'col-span-2'
					: 'col-span-1'} rounded-md"
			/>
		{/each}
	</div> -->
