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
				name: 'alert',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/alert' }]
			},
			{
				name: 'alert-dialog',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/alert-dialog' }]
			},
			{
				name: 'aspect-ratio',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/aspect-ratio' }]
			},
			{
				name: 'breadcrumb',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/breadcrumb' }]
			},
			{
				name: 'badge',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/badge' }]
			},
			{
				name: 'button',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/button' }]
			},
			{
				name: 'button-group',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/button-group' }]
			},
			{
				name: 'calendar',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/calendar' }]
			},
			{
				name: 'card',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/card' }]
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
				name: 'checkbox-group',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/checkbox-group' }]
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
				name: 'command',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/command' }]
			},
			{
				name: 'context-menu',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/context-menu' }]
			},
			{
				name: 'date-picker',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/date-picker' }]
			},
			{
				name: 'date-field',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/date-field' }]
			},
			{
				name: 'date-range-field',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/date-range-field' }]
			},
			{
				name: 'date-range-picker',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/date-range-picker' }]
			},
			{
				name: 'data-table',
				type: 'component',
				registryDependencies: [
					'checkbox',
					'date-picker',
					'menu',
					'pagination',
					'popover',
					'select'
				],
				files: [{ path: 'packages/ui/src/templates/components/data-table' }]
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
				name: 'empty',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/empty' }]
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
				name: 'input',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/input' }]
			},
			{
				name: 'input-group',
				type: 'component',
				registryDependencies: ['input', 'textarea'],
				files: [{ path: 'packages/ui/src/templates/components/input-group' }]
			},
			{
				name: 'item',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/item' }]
			},
			{
				name: 'kbd',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/kbd' }]
			},
			{
				name: 'label',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/label' }]
			},
			{
				name: 'list-box',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/list-box' }]
			},
			{
				name: 'marquee',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/marquee' }]
			},
			{
				name: 'menubar',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/menubar' }]
			},
			{
				name: 'menu',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/menu' }]
			},
			{
				name: 'meter',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/meter' }]
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
				name: 'native-select',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/native-select' }]
			},
			{
				name: 'navigation-menu',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/navigation-menu' }]
			},
			{
				name: 'pagination',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/pagination' }]
			},
			{
				name: 'progress',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/progress' }]
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
				name: 'range-calendar',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/range-calendar' }]
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
				name: 'separator',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/separator' }]
			},
			{
				name: 'slider',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/slider' }]
			},
			{
				name: 'skeleton',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/skeleton' }]
			},
			{
				name: 'spinner',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/spinner' }]
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
				name: 'table',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/table' }]
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
				name: 'time-field',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/time-field' }]
			},
			{
				name: 'time-range-field',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/time-range-field' }]
			},
			{
				name: 'timeline',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/timeline' }]
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
				name: 'toggle-group',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/toggle-group' }]
			},
			{
				name: 'toolbar',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/toolbar' }]
			},
			{
				name: 'tooltip',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/tooltip' }]
			},
			{
				name: 'textarea',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/textarea' }]
			},
			{
				name: 'tree-view',
				type: 'component',
				files: [{ path: 'packages/ui/src/templates/components/tree-view' }]
			},

			// Blocks
			{
				name: 'app-shell',
				type: 'block',
				files: [{ path: 'packages/ui/src/templates/blocks/app-shell' }],
				registryDependencies: ['sidebar']
			},
			{
				name: 'chat-panel',
				type: 'block',
				files: [{ path: 'packages/ui/src/templates/blocks/chat-panel' }]
			},
			{
				name: 'sidebar',
				type: 'block',
				files: [{ path: 'packages/ui/src/templates/blocks/sidebar' }]
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
