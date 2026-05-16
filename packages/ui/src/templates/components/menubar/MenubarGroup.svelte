<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Menubar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Group {...rest} class={cn(className as string | undefined)} />
