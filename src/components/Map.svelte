<script>
	import { PUBLIC_MAPTILER_API_KEY } from "$env/static/public";
	import { onMount, onDestroy } from "svelte";
	import { Map, MapStyle, config, Marker } from "@maptiler/sdk";
	import "@maptiler/sdk/dist/maptiler-sdk.css";

	export let street = "";
	export let city = "";
	export let state = "";
	export let zipcode = "";

	let map;
	let mapContainer;

	config.apiKey = PUBLIC_MAPTILER_API_KEY;

	onMount(async () => {
		const coordinates = await fetchCoordinates();

		map = new Map({
			container: mapContainer,
			style: MapStyle.STREETS,
			center: [coordinates.lng, coordinates.lat],
			zoom: 14,
		});

		new Marker({ color: "#EF4444" })
			.setLngLat([coordinates.lng, coordinates.lat])
			.addTo(map);
	});

	onDestroy(() => {
		if (!!map) map.remove();
	});

	async function fetchCoordinates() {
		const response = await fetch("/api/map", {
			method: "POST",
			body: JSON.stringify({ street, city, state, zipcode }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		return result;
	}
</script>

<div class="map-wrap rounded-lg shadow-md">
	<div class="map rounded-lg" bind:this={mapContainer}></div>
</div>

<style>
	.map-wrap {
		position: relative;
		height: 40vh;
		width: 100%;
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
