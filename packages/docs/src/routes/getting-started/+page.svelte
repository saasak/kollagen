<div class="mx-auto max-w-2xl p-8">
	<h1 class="text-3xl font-bold">Getting Started</h1>

	<!-- Prerequisites -->
	<section class="mt-8">
		<h2 class="text-xl font-semibold">Prerequisites</h2>
		<ul class="text-kl-muted-content mt-3 list-disc space-y-1 pl-6 text-sm">
			<li>A SvelteKit project</li>
			<li>Tailwind CSS 4</li>
		</ul>
	</section>

	<!-- Initialize -->
	<section class="mt-8">
		<h2 class="text-xl font-semibold">Initialize</h2>
		<p class="text-kl-muted-content mt-3 text-sm">
			Run the init command to install dependencies and set up the base theme with CSS variables.
		</p>
		<pre class="rounded-kl-field bg-kl-base-200 mt-3 p-4 font-mono text-sm">npx kollagen init</pre>
		<p class="text-kl-muted-content mt-3 text-sm">
			This installs <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
				>bits-ui</code
			>
			and
			<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">lucide-svelte</code>,
			then copies the base theme CSS with all
			<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">--kl-*</code> tokens into your
			project.
		</p>
	</section>

	<!-- Add components -->
	<section class="mt-8">
		<h2 class="text-xl font-semibold">Add components</h2>
		<p class="text-kl-muted-content mt-3 text-sm">
			Add individual components to your project. Each component is copied to
			<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">src/lib/components/</code
			>.
		</p>
		<pre
			class="rounded-kl-field bg-kl-base-200 mt-3 p-4 font-mono text-sm">npx kollagen add combobox</pre>
		<p class="text-kl-muted-content mt-3 text-sm">
			You own the source — edit the component directly for any customization.
		</p>
	</section>

	<!-- Theming -->
	<section class="mt-8">
		<h2 class="text-xl font-semibold">Theming</h2>
		<p class="text-kl-muted-content mt-3 text-sm">
			Components use semantic <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
				>--kl-*</code
			>
			CSS variables in OKLCH color space, mapped to Tailwind 4 via
			<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">@theme inline</code>.
		</p>
		<p class="text-kl-muted-content mt-3 text-sm">
			Switch between light and dark mode by setting the
			<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">data-theme</code>
			attribute on
			<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">&lt;html&gt;</code>:
		</p>
		<pre
			class="rounded-kl-field bg-kl-base-200 mt-3 p-4 font-mono text-sm">&lt;html data-theme="dark"&gt;</pre>
	</section>

	<!-- Next steps -->
	<section class="mt-8">
		<h2 class="text-xl font-semibold">Next steps</h2>
		<p class="text-kl-muted-content mt-3 text-sm">Check out the component documentation:</p>
		<ul class="mt-3 list-disc pl-6">
			<li>
				<a href="/components/combobox" class="text-kl-primary underline">ComboBox</a>
				— Autocomplete input with sync and async search
			</li>
		</ul>
	</section>
</div>
