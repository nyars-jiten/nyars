import type { Handwriting } from "./handwriting";

export class Null implements Handwriting {
	/* eslint-disable-next-line */
	onStart(_: MouseEvent) {}
	/* eslint-disable-next-line */
	onEnd() {}
	/* eslint-disable-next-line */
	onDraw(_: MouseEvent) {}

	undo() {
		return Promise.resolve();
	}

	step = 0;
	minLineWidth = 0;
	maxLineWidth = 0;
	lineWidth = 0;
}
