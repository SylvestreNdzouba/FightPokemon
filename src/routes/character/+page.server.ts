import { readCharacters } from '$lib/server';
import { addCharacter } from '$lib/server';
import { randomUUID } from 'crypto';
import { randomPV, randomForce } from '$lib/helpers';
import pokemon from '$lib/pokemons.json';

export function load({ depends }) {
	depends('character:all');
	const character = readCharacters();
	return {
		character
	};
}

export const actions = {
	default: async (e) => {
		const data = await e.request.formData();
		const id = parseInt(data.get('id')?.toString() || '');
		const newCharacter = addCharacter({
			uuid: randomUUID(),
			name: data.get('name')?.toString() || pokemon[id - 1].name,
			id: id,
			sprites: {
				back_default: pokemon[id - 1].sprites.back_default,
				front_default: pokemon[id - 1].sprites.front_default
			},
			points: 0,
			pv: randomPV(),
			force: randomForce()
		});

		return {
			body: JSON.stringify(newCharacter),
			headers: {
				'Content-Type': 'application/json'
			}
		};
	}
};
