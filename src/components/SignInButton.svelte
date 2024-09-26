<script>
	export let provider;
</script>

<form action={provider.signinUrl} method="POST">
	{#if provider.callbackUrl}
		<input type="hidden" name="callbackUrl" value={provider.callbackUrl} />
	{/if}
	<button type="submit" class="button">
		<slot name="submitButton">Sign in with {provider.name}</slot>
	</button>
</form>
