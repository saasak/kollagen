import { defineConfig } from 'jsrepo';
import { repository } from 'jsrepo/outputs';
import { svelte, css, js } from 'jsrepo/langs';

export default defineConfig({
	registry: {
		name: '@saasak/kollagen',
		items: [
			// Components
			{
				name: 'avatar',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/avatar' }]
			},
			{
				name: 'accordion',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/accordion' }]
			},
			{
				name: 'breadcrumb',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/breadcrumb' }]
			},
			{
				name: 'carousel',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/carousel' }]
			},
			{
				name: 'checkbox',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/checkbox' }]
			},
			{
				name: 'clipboard',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/clipboard' }]
			},
			{
				name: 'collapsible',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/collapsible' }]
			},
			{
				name: 'combobox',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/combobox' }]
			},
			{
				name: 'date-picker',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/date-picker' }]
			},
			{
				name: 'dialog',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/dialog' }]
			},
			{
				name: 'drawer',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/drawer' }]
			},
			{
				name: 'editable',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/editable' }]
			},
			{
				name: 'field',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/field' }]
			},
			{
				name: 'fieldset',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/fieldset' }]
			},
			{
				name: 'file-upload',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/file-upload' }]
			},
			{
				name: 'hover-card',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/hover-card' }]
			},
			{
				name: 'marquee',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/marquee' }]
			},
			{
				name: 'menu',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/menu' }]
			},
			{
				name: 'modal',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/modal' }]
			},
			{
				name: 'number-input',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/number-input' }]
			},
			{
				name: 'pagination',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/pagination' }]
			},
			{
				name: 'password-input',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/password-input' }]
			},
			{
				name: 'pin-input',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/pin-input' }]
			},
			{
				name: 'popover',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/popover' }]
			},
			{
				name: 'qr-code',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/qr-code' }]
			},
			{
				name: 'radio-group',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/radio-group' }]
			},
			{
				name: 'rating-group',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/rating-group' }]
			},
			{
				name: 'scroll-area',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/scroll-area' }]
			},
			{
				name: 'select',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/select' }]
			},
			{
				name: 'slider',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/slider' }]
			},
			{
				name: 'splitter',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/splitter' }]
			},
			{
				name: 'steps',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/steps' }]
			},
			{
				name: 'switch',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/switch' }]
			},
			{
				name: 'tabs',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/tabs' }]
			},
			{
				name: 'tags-input',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/tags-input' }]
			},
			{
				name: 'timer',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/timer' }]
			},
			{
				name: 'toast',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/toast' }]
			},
			{
				name: 'toggle',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/toggle' }]
			},
			{
				name: 'tooltip',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/tooltip' }]
			},
			{
				name: 'tree-view',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/tree-view' }]
			},

			// Blocks
			{
				name: 'chat-panel',
				type: 'block',
				files: [{ path: 'packages/ui/src/templates/blocks/chat-panel' }]
			}
		],
		defaultPaths: {
			component: 'src/lib/components',
			block: 'src/lib/blocks'
		},
		outputs: [repository()]
	},
	languages: [svelte(), css(), js()]
});
