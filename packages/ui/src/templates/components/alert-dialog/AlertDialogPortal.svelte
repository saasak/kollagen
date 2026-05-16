<script lang="ts">
	import { AlertDialog as Primitive } from 'bits-ui';

	let { class: _className, ...rest }: any = $props();
</script>

<Primitive.Portal {...rest} />
