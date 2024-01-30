export function randomPV(): number {
	return Math.floor(Math.random() * (200 - 50 + 1)) + 50;
}

export function randomForce(): number {
	return Math.floor(Math.random() * (50 - 20 + 1)) + 20;
}

export function randomForceAttack(fighterForce: number): number {
	return Math.floor(Math.random() * fighterForce);
}
