import type { Handwriting } from "./handwriting";

export class Null implements Handwriting {
	/* eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
	onStart(_: MouseEvent) {}

	/* eslint-disable-next-line @typescript-eslint/no-empty-function */
	onEnd() {}

	/* eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
	onDraw(_: MouseEvent) {}

	undo() {
		return Promise.resolve();
	}

	step = 0;
	minLineWidth = 0;
	maxLineWidth = 0;
	lineWidth = 0;
}
