<script>
	import "../app.css";
	import "remixicon/fonts/remixicon.css";
	import { navigating } from "$app/stores";
	import Navbar from "$components/Navbar.svelte";
	import Footer from "$components/Footer.svelte";
	import Loader from "$components/Loader.svelte";
	export let data;
	$: loggedIn = !!data.session;
</script>

<svelte:head>
	<title>PropertyPulse - Discover Your Perfect Rental</title>
	<meta
		name="keywords"
		content="rental properties, find apartments, house rentals, PropertyPulse"
	/>
	<meta
		name="description"
		content="Easily find and apply for your perfect rental property with PropertyPulse."
	/>
</svelte:head>

<Loader loading={!!$navigating} />
<main class="min-h-dvh">
	<Navbar {loggedIn} />
	<slot />
	<Footer />
</main>
