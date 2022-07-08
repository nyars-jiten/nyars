export interface Handwriting {
	onStart(e: MouseEvent): void;
	onEnd(): void;
	onDraw(e: MouseEvent): void;

	undo(): Promise<void>;

	step: number;
	minLineWidth: number;
	maxLineWidth: number;
	lineWidth: number;
}
