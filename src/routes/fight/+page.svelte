<script lang="ts">
	import { randomForceAttack } from '$lib/helpers.js';
	import type { Character } from '$lib/types.js';
	import { createEventDispatcher, onMount } from 'svelte';

	export let data;

	const queryString = window.location.search;
	const characters = data.character;
	const pokemons = data.pokemon;
	const dispatch = createEventDispatcher();

	const urlParams = new URLSearchParams(queryString);
	export const uuid1 = urlParams.get('uuid1');
	export const uuid2 = urlParams.get('uuid2');

	console.log('UUID1:', uuid1);
	console.log('UUID2:', uuid2);

	const fighter1 = characters.find((fighter) => fighter.uuid === uuid1);
	const fighter2 = characters.find((fighter) => fighter.uuid === uuid2);

	let fighter1PV = fighter1 ? fighter1.pv : 0;
	let fighter2PV = fighter2 ? fighter2.pv : 0;

	function attack() {
		console.log('attack');
		console.log(fighter1PV, fighter2PV);

		if (fighter1PV > 0 && fighter2PV > 0) {
			let fighter1Attack;
			if (fighter1) {
				fighter1Attack = randomForceAttack(fighter1.force);
				if (fighter2PV - fighter1Attack < 0) {
					fighter2PV = 0;
				} else {
					fighter2PV -= fighter1Attack;
				}
			}

			let fighter2Attack;
			if (fighter2 && fighter2PV > 0) {
				fighter2Attack = randomForceAttack(fighter2.force);
				if (fighter1PV - fighter2Attack < 0) {
					fighter1PV = 0;
				} else {
					fighter1PV -= fighter2Attack;
				}
			}
		}
	}

	export function checkWinner() {
		if (fighter1PV === fighter2PV) {
			return '';
		} else if (fighter2PV <= 0) {
			return fighter1?.uuid;
		} else if (fighter1PV <= 0) {
			return fighter2?.uuid;
		}
	}

	onMount(() => {
		const timeout = setInterval(() => {
			attack();
			if (fighter1PV === 0 || fighter2PV === 0) {
				clearInterval(timeout);
				checkWinner();
				fetch('/fight/result', {
					method: 'POST',
					body: JSON.stringify({
						uuid1: fighter1?.uuid,
						uuid2: fighter2?.uuid,
						winner: checkWinner()
					})
				});
			}
		}, 2000);

		return () => {
			clearInterval(timeout);
		};
	});
</script>

{#each characters as character}
	{#if character.uuid === uuid1}
		<div>
			<img src={pokemons[character.id].sprites.front_default} alt={character.name} />
			<p>PV : {fighter1PV}</p>
		</div>
	{/if}
	{#if character.uuid === uuid2}
		<div>
			<img src={pokemons[character.id].sprites.front_default} alt={character.name} />
			<p>PV : {fighter2PV}</p>
		</div>
	{/if}
{/each}
