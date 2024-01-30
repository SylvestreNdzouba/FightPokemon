<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Character } from '$lib/types.js';
	import { writable, get } from 'svelte/store';

	export let data;

	const characters = data.character;
	const pokemons = data.pokemon;

	export let twoCharacters: Character[] = [];

	function selectFighter(fighter: Character) {
	const selectedFighter = twoCharacters.find(
		(selectFighter) => selectFighter.uuid === fighter.uuid
	);

	if (!selectedFighter && twoCharacters.length < 2) {
		twoCharacters = [...twoCharacters, fighter];
	} else if (twoCharacters.length === 2) {
		const combatBouton = document.getElementById('combat');
		if (combatBouton) combatBouton.classList.remove('inactive');
	}
}


	function displayFight() {
		if (twoCharacters.length === 2) {
			const url = `/fight?uuid1=${twoCharacters[0].uuid}&uuid2=${twoCharacters[1].uuid}`;
			goto(url);
		}
	}
</script>

<div>
	{#each characters as character}
	<button on:click={() => selectFighter(character)}>
		<img src={pokemons[character.id].sprites.front_default} alt={character.name} />
		<p>{character.id}</p>
		<p>{character.name}</p>
	</button>
{/each}

</div>

{#if twoCharacters.length === 2}
	<a on:click={() => displayFight()} id="combat" class="inactive" href="#">Fight !</a>
{:else}
	<p></p>
{/if}