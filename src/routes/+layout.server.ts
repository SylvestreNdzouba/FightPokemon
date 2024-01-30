import pokemon from '$lib/pokemons.json';
import { championCharacter, readCharacters } from '$lib/server';

export function load({ depends }) {
	depends('character:all');
	const character = readCharacters();
	const champion = championCharacter();
	return {
		pokemon,
		character,
		champion
	};
}
