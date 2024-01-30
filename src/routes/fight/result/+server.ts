import { addPointsToCharacter, addResult } from '$lib/server/index.js';

export async function POST({ request }) {
	const results = await request.json();

	addResult(results);
	const winnerUUID = results.winner;
	const uuid1 = results.uuid1;
	const uuid2 = results.uuid2;

	if (results.winner != '') {
		addPointsToCharacter(winnerUUID, 3);
	} else {
		addPointsToCharacter(uuid1, 1);
		addPointsToCharacter(uuid2, 1);
	}
	return new Response();
}
