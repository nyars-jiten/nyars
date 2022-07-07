import type { Handwriting } from "./handwriting";

export class Null implements Handwriting {
	onStart(_: MouseEvent) {}
	onEnd() {}
	onDraw(_: MouseEvent) {}

	undo() {
		return Promise.resolve();
	}

	step = 0;
	minLineWidth = 0;
	maxLineWidth = 0;
	lineWidth = 0;
}
