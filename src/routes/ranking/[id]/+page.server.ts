import characters from '$lib/generated/characters.json';
import history from '$lib/generated/history.json';

export function load({ params }) {
	const uuidOfCharacter = params.id;
	const rankingCharacter = characters.find((character) => character.uuid == uuidOfCharacter);
	const historyCharacter = history.filter(
		(character) => character.uuid1 == uuidOfCharacter || character.uuid2 == uuidOfCharacter
	);
	let tab = [];
	historyCharacter.forEach((el) => {
		const perso1 = characters.find((character) => character.uuid == el.uuid1);
		const perso2 = characters.find((character) => character.uuid == el.uuid2);

		tab.push({ perso1, perso2, winnerUUID: el.winner });
	});

	return {
		infoCharacter: rankingCharacter,
		historyFight: tab
	};
}
