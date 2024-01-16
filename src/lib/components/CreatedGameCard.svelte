<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { Subscriber } from '$lib/events';
	import { GameStates } from '$lib/types';
	import { copy } from '$lib/utils';
	import { GameState, type Game } from '@prisma/client';
	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';
	import { toast } from 'svelte-sonner';
	export let subscriber: Subscriber<Game>;
	const [payload] = subscriber.subscribe();
	$: if ($payload.state === GameState.OPPONENT_JOINING)
		toast(`Your opponnent is joining ${$payload.roomID}`, {
			description: 'You should join too ;D'
		});
	const dispatch = createEventDispatcher();
	const handleJoin = async () => await goto($payload.gameLink);
	const handleDelete = async () => dispatch('game-deleted', $payload);
</script>

{#if $payload}
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<div class="flex w-full justify-between items-center">
					<span>Created Room</span>

					<span class="text-sm font-semibold text-muted-foreground">
						Status: {GameStates[$payload.state]}
					</span>
				</div>
			</Card.Title>
			<Card.Description>Online room: {$payload.roomID}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<span class="font-extralight text-muted-foreground">Created at:</span>
				{dayjs($payload.createdAt).format('MMM DD, YYYY')}
			</div>
			<div>
				<span class="font-extralight text-muted-foreground">Invite Link:</span>
				<a
					on:click|preventDefault={() =>
						copy($payload.inviteLink, () =>
							toast('Copied invite link to clipboard', {
								description: 'You can send it to your desired opponent'
							})
						)}
					target="_blank"
					href={$payload.inviteLink}>{$payload.inviteLink}</a
				>
			</div>
			<div>
				<span class="font-extralight text-muted-foreground">Game Link:</span>
				<a
					on:click|preventDefault={() =>
						copy($payload.gameLink, () =>
							toast('Copied game link to clipboard', {
								description: 'To join yourself to the game just hit the join button ;D'
							})
						)}
					target="_blank"
					href={$payload.gameLink}>{$payload.gameLink}</a
				>
			</div>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full justify-end gap-6">
				<button class="btn-text" on:click={handleJoin}>Join</button>
				<button class="btn-text" on:click={handleDelete}>Delete</button>
			</div>
		</Card.Footer>
	</Card.Root>
{/if}
