export function isEnabled(name) {
	//rendebuttons
    return window.location.hash.split('#').includes(name);
}
