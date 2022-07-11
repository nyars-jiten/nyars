import type { Handwriting } from "./handwriting";

export class Null implements Handwriting {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- onStart
	onStart(_: MouseEvent) {
		return undefined;
	}

	onEnd() {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- onDraw
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
