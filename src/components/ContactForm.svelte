<script>
	import { SignIn } from "@auth/sveltekit/components";
	import { enhance } from "$app/forms";
	export let form;
	export let session;
	export let receiver_email;
	export let property_id;
</script>

{#if !!session}
	<form
		method="post"
		use:enhance
		class="sm:sticky sm:top-4 flex flex-col gap-4 p-4 rounded-md shadow-md bg-white text-gray-800 h-fit"
	>
		<h3 class="text-xl font-medium">Contact Property Owner</h3>
		{#if !form?.isValidated && form?.failureDueTo["server"]}
			<span class="error">{form?.failureDueTo["server"]}</span>
		{/if}
		<!-- property_id -->
		<input type="text" name="property_id" value={property_id} hidden />
		<!-- sender_name -->
		<input type="text" name="sender_name" value={session?.user?.name} hidden />
		<!-- sender_email -->
		<input
			type="text"
			name="sender_email"
			value={session?.user?.email}
			hidden
		/>
		<!-- receiver_email -->
		<input type="text" name="receiver_email" value={receiver_email} hidden />
		<!-- contact number -->
		<div class="flex flex-col gap-2">
			<label for="sender_phone_number" class="font-medium">Contact no.</label>
			{#if !form?.isValidated && !form?.failureDueTo["server"] && form?.failureDueTo["sender_phone_number"]}
				<span class="error">{form?.failureDueTo["sender_phone_number"]}</span>
			{/if}
			<input
				type="text"
				id="sender_phone_number"
				name="sender_phone_number"
				placeholder="Enter your phone number"
				class="rounded-md border outline-blue-500 p-2"
			/>
		</div>
		<!-- message -->
		<div class="flex flex-col gap-2">
			<label for="content" class="font-medium">Message</label>
			{#if !form?.isValidated && !form?.failureDueTo["server"] && form?.failureDueTo["content"]}
				<span class="error">{form?.failureDueTo["content"]}</span>
			{/if}
			<textarea
				rows="4"
				type="text"
				id="content"
				name="content"
				placeholder="Enter your message"
				class="rounded-md border outline-blue-500 p-2 resize-none"
			/>
		</div>
		<!-- submit button -->
		<button type="submit" class="btn-primary space-x-2">
			<i class="ri-send-plane-fill"></i>
			<span class="">Send Message</span>
		</button>

		{#if form?.isValidated}
			<p class="text-green-600 font-medium font-mono">
				<i class="ri-checkbox-circle-fill"></i>
				<span>Message sent successfully</span>
			</p>
		{/if}
	</form>
{:else}
	<div
		class="sm:sticky sm:top-4 flex flex-col gap-4 p-4 rounded-md shadow-md bg-white text-gray-800 h-fit"
	>
		<h3 class="text-xl font-medium text-center">
			Login to contact property owner
		</h3>
		<SignIn class="w-fit mx-auto">
			<div slot="submitButton" class="btn-primary space-x-2">
				<i class="ri-google-fill"></i>
				<span>Login</span>
			</div>
		</SignIn>
	</div>
{/if}
