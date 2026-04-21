let open = $state(false);

export const sidebarState = {
	get open() {
		return open;
	},
	set open(v: boolean) {
		open = v;
	},
	toggle() {
		open = !open;
	}
};
