import type { Reading } from "./reading";

export type Readings = {
	onyomi: Reading[];
	kunyomi: Reading[];
	nanori: Reading[];
	other: Reading[];
};
