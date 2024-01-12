// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import pkg from 'pg';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			client: pkg.Client;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
