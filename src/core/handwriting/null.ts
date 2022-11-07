import type { Handwriting } from "./handwriting";
import type { GoogleProposals } from "./types/google-proposals";

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

	onResize(_: FocusEvent) {
		return undefined;
	}

	getProposals(): Promise<GoogleProposals> {
		return Promise.resolve<GoogleProposals>(["SUCCESS", [["", []]]]);
	}

	undo() {
		return Promise.resolve();
	}

	clear() {
		return undefined;
	}

	step = 0;
	minLineWidth = 0;
	maxLineWidth = 0;
	lineWidth = 0;
	inAction = true;
}
