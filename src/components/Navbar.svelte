<script>
	import { DropdownMenu } from "bits-ui";
	import { page } from "$app/stores";
	import { SignIn, SignOut } from "@auth/sveltekit/components";

	export let loggedIn = false;
</script>

<header class="relative flex justify-center items-center px-2 py-4 bg-blue-700">
	<nav>
		<DropdownMenu.Root>
			<!-- hamburger button -->
			<DropdownMenu.Trigger
				class="absolute top-1/2 right-4 -translate-y-1/2 px-2 py-1 border border-gray-50 hover:bg-blue-800 active:bg-opacity-50 rounded-md  transition-all duration-200"
			>
				<i class="ri-align-justify text-2xl text-gray-50"></i>
			</DropdownMenu.Trigger>

			<!-- dropdown -->
			<DropdownMenu.Content
				class="w-full max-w-[220px] rounded-md border border-muted bg-blue-700 px-1 py-1.5 shadow-popover"
				sideOffset={8}
			>
				{#if loggedIn}
					<!-- profile -->
					<DropdownMenu.Item>
						<a
							href="/profile"
							class="{$page.route.id.includes('/profile') &&
								'bg-blue-800'} dropdown-item"
						>
							<i class="ri-user-3-fill text-xl"></i>
							<span>Profile</span>
						</a>
					</DropdownMenu.Item>

					<!-- messages -->
					<DropdownMenu.Item>
						<a
							href="/messages"
							class="{$page.route.id.includes('/messages') &&
								'bg-blue-800'} dropdown-item"
						>
							<i class="ri-message-2-fill text-xl"></i>
							<span>Messages</span>
						</a>
					</DropdownMenu.Item>

					<!-- wishlist -->
					<!-- <DropdownMenu.Item>
						<a
							href="/wishlist"
							class="{$page.route.id.includes('/wishlist') &&
								'bg-blue-800'} dropdown-item"
						>
							<i class="ri-heart-fill text-xl"></i>
							<span>Wishlist</span>
						</a>
					</DropdownMenu.Item> -->

					<DropdownMenu.Separator
						class="my-1 -ml-1 -mr-1 block h-[2px] bg-blue-900"
					/>
				{/if}

				<!-- home -->
				<DropdownMenu.Item>
					<a
						href="/"
						class="{$page.route.id === '/' && 'bg-blue-800'} dropdown-item"
					>
						<i class="ri-home-7-fill text-xl"></i>
						<span>Home</span>
					</a>
				</DropdownMenu.Item>

				<!-- properties -->
				<DropdownMenu.Item>
					<a
						href="/properties"
						class="{$page.route.id.includes('/properties') &&
							'bg-blue-800'} dropdown-item"
					>
						<i class="ri-building-fill text-xl"></i>
						<span>Properties</span>
					</a>
				</DropdownMenu.Item>

				{#if loggedIn}
					<!-- add -->
					<DropdownMenu.Item>
						<a
							href="/add"
							class="{$page.route.id.includes('/add') &&
								'bg-blue-800'} dropdown-item"
						>
							<i class="ri-add-fill text-xl"></i>
							<span>Add Property</span>
						</a>
					</DropdownMenu.Item>
				{/if}

				{#if !loggedIn}
					<DropdownMenu.Item>
						<SignIn>
							<div slot="submitButton" class="dropdown-item w-[210px]">
								<i class="ri-google-fill text-xl"></i>
								<span>Login</span>
							</div>
						</SignIn>
					</DropdownMenu.Item>
				{:else}
					<DropdownMenu.Item>
						<SignOut>
							<div slot="submitButton" class="dropdown-item w-[210px]">
								<i class="ri-logout-box-fill text-xl"></i>
								<span>Sign Out</span>
							</div>
						</SignOut>
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</nav>

	<a href="/" class="text-gray-50 text-4xl flex items-center gap-2">
		<i class="ri-home-7-fill"></i>
		<p class="font-semibold hidden sm:block">PropertyPulse</p>
	</a>
</header>

<style>
	.dropdown-item {
		@apply flex items-center gap-2 px-2 py-1
		rounded-sm text-gray-50 hover:bg-blue-800
		transition-all duration-200;
	}
</style>
