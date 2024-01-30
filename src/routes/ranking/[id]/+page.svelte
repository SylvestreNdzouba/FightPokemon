<script lang="ts">
	export let data;
	const character = data.infoCharacter;
	const pokemons = data.pokemon;
	const history = data.historyFight;
	console.log('ooooo', history);
</script>

<img src={pokemons[character.id].sprites.front_default} alt={character?.name} />
<div>{character?.name}</div>
<div>Nombre de point : {character?.points}</div>
{#each history as historyFight}
	<div>{historyFight.perso1.name} VS {historyFight.perso2.name}</div>
	{#if historyFight.perso1.uuid === historyFight.winnerUUID}
		<div>
			The winner is {historyFight.perso1.name}
			<img
				src={pokemons[historyFight.perso1.id].sprites.front_default}
				alt={historyFight.perso1.name}
			/>
		</div>
	{:else}
		<div>
			The winner is {historyFight.perso2.name}
			<img
				src={pokemons[historyFight.perso2.id].sprites.front_default}
				alt={historyFight.perso2.name}
			/>
		</div>
	{/if}
	<br />
	<br />
	<br />
{/each}
