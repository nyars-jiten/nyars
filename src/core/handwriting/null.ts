import type { Handwriting } from "./handwriting";

export class Null implements Handwriting {
	/* eslint-disable */
	onStart(_: MouseEvent) {}
	onEnd() {}
	/* eslint-disable */
	onDraw(_: MouseEvent) {}

	undo() {
		return Promise.resolve();
	}

	step = 0;
	minLineWidth = 0;
	maxLineWidth = 0;
	lineWidth = 0;
}
