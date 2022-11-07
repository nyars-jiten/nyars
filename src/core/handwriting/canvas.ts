import { isEmpty } from "lodash";
import type { Handwriting } from "./handwriting";
import type { GoogleProposals } from "./types/google-proposals";

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

	get inAction() {
		return this._inAction;
	}

	async getProposals(): Promise<GoogleProposals> {
		if (isEmpty(this.history)) return ["SUCCESS", [["", []]]];

		const body = {
			options: "enable_pre_space",
			requests: [
				{
					writing_guide: {
						writing_area_width: this.canvas.width,
						writing_area_height: this.canvas.height,
					},
					ink: this.history.map(e => [
						e.points.map(e => e[0]),
						e.points.map(e => e[1]),
						[],
					]),
					language: "ja",
				},
			],
		};

		const response = await fetch(
			"https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);

		return await response.json();
	}

	clear() {
		this.history = [];
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	onStart(e: MouseEvent) {
		this.history.push({
			image: this.canvas.toDataURL(),
			points: [],
		});

		this._inAction = true;
		this.updatePosition(e);

		this.context.beginPath();
		this.context.moveTo(this.pos.x, this.pos.y);

		this.context.lineCap = "round";
		this.context.strokeStyle = "rgb(113, 113, 122)";

		this.pushNext();
	}

	onEnd() {
		if (!this._inAction) return;

		this._inAction = false;

		this.pushNext();
	}

	onDraw(e: MouseEvent) {
		if (!this._inAction) return;

		this.updatePosition(e);

		this.context.lineTo(this.pos.x, this.pos.y);
		this.context.stroke();

		this.pushNext();
	}

	async undo() {
		const el = this.history.pop();
		if (!el) return;

		const img = await this.restoreImage(el.image);

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.drawImage(img, 0, 0);
	}

	onResize(payload?: FocusEvent) {
		console.log("onResize");

		console.log(this.canvas.clientWidth);
		console.log(this.canvas.width);
		console.log(this.canvas.offsetWidth);

		console.log("---");

		console.log(this.canvas.clientHeight);
		console.log(this.canvas.height);
		console.log(this.canvas.offsetHeight);

		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.onResize()

		this.context = this.getContext();
		this.pos = { x: 0, y: 0 };
		this._inAction = false;
		this.history = [];
		// console.log(this.canvas.width);
		// console.log(this.canvas.height);

		this.lineWidth = 3;
	}

	private restoreImage(value: string) {
		return new Promise<HTMLImageElement>(resolve => {
			const img = new Image();
			img.onload = () => resolve(img);

			img.src = value;
		});
	}

	private pushNext() {
		this.history[this.history.length - 1].points.push([this.pos.x, this.pos.y]);
	}

	private getContext() {
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
	private _inAction;

	private history: {
		points: number[][];
		image: string;
	}[];
}
