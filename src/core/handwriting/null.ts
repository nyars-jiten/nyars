import type { Handwriting } from "./handwriting";

export class Null implements Handwriting {
	onStart(_: MouseEvent) {
		return undefined;
	}

	onEnd() {
		return undefined;
	}

	onDraw(_: MouseEvent) {
		return undefined;
	}

	undo() {
		return Promise.resolve();
	}

	step = 0;
	minLineWidth = 0;
	maxLineWidth = 0;
	lineWidth = 0;
}
