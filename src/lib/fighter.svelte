<script lang="ts">
	export let character: {
		id: number;
		name: string;
		points: number;
		sprites: {
			front_default: string;
		};
	};
</script>

<li>
	<a href="ranking/{character.id}">
		<img src={character.sprites.front_default} alt={character.name} />
		<p>{character.name}</p>
		<p>Nombre de points : {character.points}</p>
	</a>
</li>
