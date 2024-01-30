<script lang="ts">
	import type { Character } from '$lib/types';

	export let data;
	const pokemon = data.pokemon;

	let champion: Character | null;
	$: champion = data.champion;
</script>

<nav>
	<a href="/">Accueil</a>
	<a href="/character">Personnages</a>
	<a href="/ranking">Classement</a>

	{#if champion === null}
		<p>Pas de champion</p>
	{:else}
		<p>
			Champion : {champion.name}
			<img src={pokemon[champion.id].sprites.front_default} alt={champion.name} />
			{champion.points} points
		</p>
	{/if}
</nav>

<slot />

<style>
	nav {
		display: flex;
		justify-content: center;
		background-color: lightgray;
		height: 50px;
	}
	a {
		text-decoration: none;
		padding: 0 10px;
		color: black;
		margin-top: 10px;
		font-size: 25px;
	}
</style>
