<script lang="ts">
	export let data;
	import Character from '$lib/fighter.svelte';
	const pokemons = data.pokemon;
</script>

<div>
	{#each data.character.sort((a, b) => b.points - a.points) as character}
		<a href="/ranking/{character.uuid}">
			<img src={pokemons[character.id].sprites.front_default} alt={character.name} />
			<p>{character.name}</p>
			<p>Nombre de points : {character.points}</p>
		</a>
	{/each}
</div>
