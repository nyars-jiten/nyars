type TagVariant = "Fld" | "Dial" | "Misc";

type Tag = {
	type: TagVariant;
	values: string[];
};

type Tags = Tag[];

export type Sense = {
	tags: Tags;
	value: string;
	examples: { value: string; translation: string }[];
	isRare: boolean;
};
