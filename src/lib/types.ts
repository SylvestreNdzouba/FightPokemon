import type data from './pokemons.json';
import { writable } from 'svelte/store';

export type Pokemon = (typeof data)[number];

export type Character = {
	uuid: string;
	name: string;
	id: number;
	sprites: {
		front_default: string;
		back_default: string;
	};
	points: number;
	pv: number;
	force: number;
};

export type History = {
	uuid1: string;
	uuid2: string;
	winner: string;
};

export const twoCharacters = writable<Character[]>([]);
