import { readFileSync, writeFileSync } from 'fs';
import type { Character } from '../types';
import type { History } from '../types';

let fighters: Character[] = readCharacters();
let results: History[] = readResults();

export function addCharacter(pokemon: Character) {
	console.log(fighters);

	fighters = [...fighters, pokemon];
	console.log(fighters);
	saveCharacters();
	return fighters;
}

export function saveCharacters() {
	writeFileSync('src/lib/generated/characters.json', JSON.stringify(fighters));
}

export function readCharacters() {
	try {
		const data = readFileSync('src/lib/generated/characters.json', 'utf-8');
		return JSON.parse(data) as Character[];
	} catch (e) {
		console.log('No file');
		return [];
	}
}

export function addResult(result: History) {
	results = [...results, result];
	saveResults();
	return results;
}

export function saveResults() {
	writeFileSync('src/lib/generated/history.json', JSON.stringify(results));
}

export function readResults() {
	try {
		const data = readFileSync('src/lib/generated/history.json', 'utf-8');
		return JSON.parse(data) as History[];
	} catch (e) {
		console.log('No file');
		return [];
	}
}

export function addPointsToCharacter(characterUuid: string, points: number) {
	const updatedCharacters = fighters.map((character) => {
		if (character.uuid === characterUuid) {
			character.points += points;
		}
		return character;
	});

	saveCharactersPoints(updatedCharacters);
}

export function saveCharactersPoints(characters: Character[]) {
	const updatedCharacters = [...characters];
	writeFileSync('src/lib/generated/characters.json', JSON.stringify(updatedCharacters));
}

export function championCharacter() {
	const characters = readCharacters();
	let champion = null;
	let bestPoints = 0;

	characters.forEach((character) => {
		if (character.points > bestPoints) {
			bestPoints = character.points;
			champion = character;
		}
	});

	return champion;
}
