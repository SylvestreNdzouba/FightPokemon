<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	export let data;

	const queryString = window.location.search;

	const characters = data.character;
	const pokemons = data.pokemon;

	const dispatch = createEventDispatcher();

	const urlParams = new URLSearchParams(queryString);

	export const uuid1 = urlParams.get('uuid1');
	export const uuid2 = urlParams.get('uuid2');

	console.log('UUID1:', uuid1);
	console.log('UUID2:', uuid2);

	onMount(() => {
		const timeout = setInterval(() => {
			dispatch('attack');
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

{#each characters as character}
	{#if character.uuid === uuid1}
		<div>
			<img src={pokemons[character.id].sprites.front_default} alt={character.name} />
			<p>PV : {character.pv}</p>
		</div>
	{/if}
	{#if character.uuid === uuid2}
		<div>
			<img src={pokemons[character.id].sprites.front_default} alt={character.name} />
			<p>PV : {character.pv}</p>
		</div>
	{/if}
{/each}
