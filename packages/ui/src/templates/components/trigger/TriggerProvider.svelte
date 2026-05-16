<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { triggerContextKey, type TriggerPrimitiveProps } from './context';

	interface Props {
		props: TriggerPrimitiveProps;
		children?: Snippet;
	}

	let { props, children }: Props = $props();

	setContext(triggerContextKey, () => props);
</script>

{@render children?.()}
