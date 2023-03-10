const OPTIONS_OBSERVER = {
	root       : null,
	rootMargin : '0px 0px 0px 0px',
	threshold  : 0.02
};

function ACTION_ON_TARGET (entries: IntersectionObserverEntry[]): void {
	for (let i = 0; i < entries.length; i++) {
		const ENTRY = entries[i];

		if (ENTRY.isIntersecting) {
			const IMG = ENTRY.target;
			const ALT = ENTRY.target.getAttribute('data-alt-img');
			const SRC = ENTRY.target.getAttribute('data-src-img');

			IMG.setAttribute('src', `${SRC}`);
			IMG.setAttribute('alt', `${ALT}`);
		}
	}

	// entries.forEach(
	// 	function (entry: IntersectionObserverEntry) {
	// 		if (entry.isIntersecting) {
	// 			const IMG = entry.target;
	// 			const ALT = entry.target.getAttribute('data-alt-img');
	// 			const SRC = entry.target.getAttribute('data-src-img');

	// 			IMG.setAttribute('src', `${SRC}`);
	// 			IMG.setAttribute('alt', `${ALT}`);
	// 		}
	// 	}
	// );
}

export const LAZY_LOADER = new IntersectionObserver(ACTION_ON_TARGET, OPTIONS_OBSERVER);
