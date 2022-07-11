import type { ReferenceVariant } from "./reference-variant";

export type Reference = {
	referenceType: ReferenceVariant;
	target?: string;
	value: string;
};
