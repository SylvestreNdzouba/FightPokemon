<script lang="ts">
	export let data;
	const pokemons = data.pokemon;
</script>

<div>
	<form method="POST">
		<label for="id">Nom du combattant</label>
		<select name="id" id="id" required>
			{#each pokemons as pokemon}
				<option value={pokemon.id}>{pokemon.id} | {pokemon.name}</option>
			{/each}
		</select><br />

		<label for="name">Surnom : </label>
		<input type="text" name="name" id="name" value="" />

		<button type="submit">Valider</button>
	</form>
</div>
