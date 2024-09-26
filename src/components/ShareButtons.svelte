<script>
	export let shareUrl = "";

	function shareOnX() {
		window.open(
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
			"_blank"
		);
	}

	function shareOnWhatsApp() {
		window.open(
			`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
			"_blank"
		);
	}

	function shareOnGmail() {
		const subject = encodeURIComponent("Check out this property!");
		const body = encodeURIComponent(
			`I found this property you might like: ${shareUrl}`
		);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	}

	function closeModal() {
		const modal = document.getElementById("shareModal");
		if (modal) modal.style.display = "none";
	}
</script>

<div class="flex items-center gap-2">
	<button class="btn-share bg-gray-800" on:click={shareOnX}>
		<i class="ri-twitter-x-fill text-2xl"></i>
	</button>
	<button class="btn-share bg-red-500" on:click={shareOnGmail}>
		<i class="ri-mail-fill text-2xl"></i>
	</button>
	<button class="btn-share bg-green-500" on:click={shareOnWhatsApp}>
		<i class="ri-whatsapp-fill text-2xl"></i>
	</button>
</div>

<style>
	.btn-share {
		@apply size-12 rounded-full text-gray-50 
    hover:bg-opacity-75 transition-all duration-200;
	}
</style>
