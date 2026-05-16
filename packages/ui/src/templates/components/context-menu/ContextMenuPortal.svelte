<script lang="ts">
	import { ContextMenu as Primitive } from 'bits-ui';

	let { class: _className, ...rest }: any = $props();
</script>

<Primitive.Portal {...rest} />
