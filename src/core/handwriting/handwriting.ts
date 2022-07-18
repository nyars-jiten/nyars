import type { GoogleProposals } from "./types/google-proposals";

export interface Handwriting {
	onStart(e: MouseEvent): void;
	onEnd(): void;
	onDraw(e: MouseEvent): void;

	getProposals(): Promise<GoogleProposals>;
	undo(): Promise<void>;
	clear(): void;

	step: number;
	minLineWidth: number;
	maxLineWidth: number;
	lineWidth: number;
	inAction: boolean;
}
