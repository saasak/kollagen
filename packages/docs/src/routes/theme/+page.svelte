<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type TokenDefinition = {
		name: string;
		variable: string;
	};

	type TokenValue = TokenDefinition & {
		value: string;
	};

	type TokenGroup = {
		title: string;
		tokens: TokenValue[];
	};

	type ThemeSnapshot = {
		themeName: string;
		modeName: 'light' | 'dark';
		colorGroups: TokenGroup[];
		parameterGroups: TokenGroup[];
	};

	const colorTokenGroups: Array<{ title: string; tokens: TokenDefinition[] }> = [
		{
			title: 'Brand',
			tokens: [
				{ name: 'Primary', variable: '--kl-primary' },
				{ name: 'Primary content', variable: '--kl-primary-content' },
				{ name: 'Secondary', variable: '--kl-secondary' },
				{ name: 'Secondary content', variable: '--kl-secondary-content' },
				{ name: 'Accent', variable: '--kl-accent' },
				{ name: 'Accent content', variable: '--kl-accent-content' }
			]
		},
		{
			title: 'Surfaces',
			tokens: [
				{ name: 'Base 100', variable: '--kl-base-100' },
				{ name: 'Base 200', variable: '--kl-base-200' },
				{ name: 'Base 300', variable: '--kl-base-300' },
				{ name: 'Base content', variable: '--kl-base-content' },
				{ name: 'Muted', variable: '--kl-muted' },
				{ name: 'Muted content', variable: '--kl-muted-content' }
			]
		},
		{
			title: 'Status',
			tokens: [
				{ name: 'Info', variable: '--kl-info' },
				{ name: 'Success', variable: '--kl-success' },
				{ name: 'Warning', variable: '--kl-warning' },
				{ name: 'Error', variable: '--kl-error' }
			]
		}
	];

	const parameterTokenGroups: Array<{ title: string; tokens: TokenDefinition[] }> = [
		{
			title: 'Shape',
			tokens: [
				{ name: 'Selector radius', variable: '--kl-radius-selector' },
				{ name: 'Field radius', variable: '--kl-radius-field' },
				{ name: 'Box radius', variable: '--kl-radius-box' },
				{ name: 'Border width', variable: '--kl-border-width' },
				{ name: 'Outline width', variable: '--kl-outline-width' }
			]
		},
		{
			title: 'Rhythm',
			tokens: [
				{ name: 'Density', variable: '--kl-density' },
				{ name: 'Reading density', variable: '--kl-density-reading' },
				{ name: 'Motion scale', variable: '--kl-motion-scale' },
				{ name: 'Contrast level', variable: '--kl-contrast-level' }
			]
		}
	];

	let themeRevision = $state(0);

	const snapshot = $derived.by(() => {
		themeRevision;
		return readSnapshot();
	});
	const brandPreview = $derived(
		snapshot.colorGroups.find((group) => group.title === 'Brand')?.tokens ?? []
	);
	const surfacePreview = $derived(
		snapshot.colorGroups.find((group) => group.title === 'Surfaces')?.tokens.slice(0, 3) ?? []
	);
	const radiusPreview = $derived(
		snapshot.parameterGroups.find((group) => group.title === 'Shape')?.tokens.slice(0, 3) ?? []
	);

	function readSnapshot(): ThemeSnapshot {
		if (!browser) {
			return {
				themeName: 'default',
				modeName: 'light',
				colorGroups: [],
				parameterGroups: []
			};
		}

		const root = document.documentElement;
		const styles = getComputedStyle(root);
		return {
			themeName: root.dataset.theme || 'default',
			modeName: root.dataset.mode === 'dark' ? 'dark' : 'light',
			colorGroups: colorTokenGroups.map((group) => ({
				title: group.title,
				tokens: group.tokens.map((token) => ({
					...token,
					value: styles.getPropertyValue(token.variable).trim()
				}))
			})),
			parameterGroups: parameterTokenGroups.map((group) => ({
				title: group.title,
				tokens: group.tokens.map((token) => ({
					...token,
					value: styles.getPropertyValue(token.variable).trim()
				}))
			}))
		};
	}

	onMount(() => {
		themeRevision += 1;

		const observer = new MutationObserver(() => {
			themeRevision += 1;
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme', 'data-mode']
		});

		return () => observer.disconnect();
	});
</script>

<div class="space-y-8">
	<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
		<div>
			<h1 class="text-3xl font-bold">Theme</h1>
			<p class="text-kl-muted-content mt-2">
				Live view of the CSS tokens currently applied to the docs.
			</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<span
				class="rounded-kl-field border-kl-base-300 bg-kl-base-200 text-kl-base-content border px-3 py-1.5 text-sm font-medium capitalize"
			>
				{snapshot.themeName}
			</span>
			<span
				class="rounded-kl-field border-kl-base-300 bg-kl-base-200 text-kl-muted-content border px-3 py-1.5 text-sm font-medium capitalize"
			>
				{snapshot.modeName}
			</span>
		</div>
	</div>

	<section class="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
		<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
			<h2 class="text-lg font-semibold">Preview</h2>
			<div class="mt-4 space-y-4">
				<div class="rounded-kl-box border-kl-base-300 grid grid-cols-3 overflow-hidden border">
					{#each surfacePreview as token (token.variable)}
						<div class="min-h-20 p-3" style:background-color={token.value}>
							<span class="text-kl-base-content text-xs font-medium">{token.name}</span>
						</div>
					{/each}
				</div>
				<div class="flex flex-wrap gap-2">
					{#each brandPreview.filter((token) => !token.name.includes('content')) as token (token.variable)}
						<span
							class="rounded-kl-field shadow-kl-sm px-3 py-2 text-sm font-medium"
							style:background-color={token.value}
							style:color={token.variable === '--kl-primary'
								? 'var(--kl-primary-content)'
								: token.variable === '--kl-secondary'
									? 'var(--kl-secondary-content)'
									: 'var(--kl-accent-content)'}
						>
							{token.name}
						</span>
					{/each}
				</div>
				<div class="flex flex-wrap items-end gap-3">
					{#each radiusPreview as token (token.variable)}
						<div>
							<div
								class="border-kl-base-300 bg-kl-muted h-12 w-16 border"
								style:border-radius={token.value}
							></div>
							<p class="text-kl-muted-content mt-1 text-xs">{token.name}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
			<h2 class="text-lg font-semibold">Parameters</h2>
			<div class="mt-4 space-y-4">
				{#each snapshot.parameterGroups as group (group.title)}
					<div>
						<h3 class="text-kl-muted-content text-xs font-semibold tracking-wider uppercase">
							{group.title}
						</h3>
						<div
							class="divide-kl-base-300 rounded-kl-box border-kl-base-300 mt-2 divide-y overflow-hidden border"
						>
							{#each group.tokens as token (token.variable)}
								<div class="grid grid-cols-[1fr_auto] gap-3 px-3 py-2 text-sm">
									<span class="text-kl-base-content">{token.name}</span>
									<code class="text-kl-muted-content font-mono text-xs"
										>{token.value || 'unset'}</code
									>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="space-y-4">
		{#each snapshot.colorGroups as group (group.title)}
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border">
				<div class="border-kl-base-300 border-b px-4 py-3">
					<h2 class="font-semibold">{group.title}</h2>
				</div>
				<div class="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
					{#each group.tokens as token (token.variable)}
						<div class="rounded-kl-box border-kl-base-300 overflow-hidden border">
							<div class="h-20" style:background-color={token.value}></div>
							<div class="space-y-1 p-3">
								<div class="flex items-center justify-between gap-3">
									<span class="text-sm font-medium">{token.name}</span>
									<code class="text-kl-muted-content font-mono text-xs">{token.variable}</code>
								</div>
								<p class="text-kl-muted-content truncate font-mono text-xs">
									{token.value || 'unset'}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>
</div>
