import type { Handwriting } from "./handwriting";

export class Canvas implements Handwriting {
	readonly step = 1;
	readonly minLineWidth = 1;
	readonly maxLineWidth = 15;

	set lineWidth(value: number) {
		this.context.lineWidth = value;
	}

	get lineWidth() {
		return this.context.lineWidth;
	}

	onStart(e: MouseEvent) {
		this.history.push(this.canvas.toDataURL());

		this.inAction = true;
		this.updatePosition(e);

		this.context.beginPath();
		this.context.moveTo(this.pos.x, this.pos.y);

		this.context.lineCap = "round";
		this.context.strokeStyle = "rgb(55, 65, 81)";
	}

	onEnd() {
		if (!this.inAction) return;

		this.inAction = false;
	}

	onDraw(e: MouseEvent) {
		if (!this.inAction) return;

		this.updatePosition(e);

		this.context.lineTo(this.pos.x, this.pos.y);
		this.context.stroke();
	}

	async undo() {
		const el = this.history.pop();
		if (!el) return;
		console.log("und");

		const img = await this.restoreImage(el);
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.drawImage(img, 0, 0);
	}

	private restoreImage = (value: string) => {
		return new Promise<HTMLImageElement>(resolve => {
			const img = new Image();
			img.onload = () => resolve(img);

			img.src = value;
		});
	};

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;

		this.context = this.GetContext();
		this.pos = { x: 0, y: 0 };
		this.inAction = false;
		this.history = [];

		this.lineWidth = 3;
	}

	private GetContext() {
		const ctx = this.canvas.getContext("2d");
		if (ctx == null) throw new Error("No canvas context");

		return ctx;
	}

	private updatePosition(e: MouseEvent) {
		const rect = this.canvas.getBoundingClientRect();

		const scale = {
			x: this.canvas.width / rect.width,
			y: this.canvas.height / rect.height,
		};

		this.pos.x = (e.clientX - rect.left) * scale.x;
		this.pos.y = (e.clientY - rect.top) * scale.y;
	}

	private canvas;
	private context;
	private pos;
	private inAction;
	private history: string[];
}
