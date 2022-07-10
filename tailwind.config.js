const tagJlptN1 = "#ea2a92";
const tagJlptN2 = "#f99717";
const tagJlptN3 = "#84bf26";
const tagJlptN4 = "#459f94";
const tagJlptN5 = "#3273bb";
const tagCommon = "gray";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts}"],
	theme: {
		extend: {
			fontFamily: {
				header: ['"Exo 2"', '"Yuji Syuku"', "Arial", "sans-serif"],
				body: ['"Exo 2"', '"Kosugi"', "Arial", "sans-serif"],
			},
			backgroundImage: {
				logo: "url('/favicon-96x96.png')",
			},
			colors: {
				"tag-common": tagCommon,
				"tag-jlpt-n5": tagJlptN5,
				"tag-jlpt-n4": tagJlptN4,
				"tag-jlpt-n3": tagJlptN3,
				"tag-jlpt-n2": tagJlptN2,
				"tag-jlpt-n1": tagJlptN1,
			},
			borderColor: {
				"tag-common": tagCommon,
				"tag-jlpt-n5": tagJlptN5,
				"tag-jlpt-n4": tagJlptN4,
				"tag-jlpt-n3": tagJlptN3,
				"tag-jlpt-n2": tagJlptN2,
				"tag-jlpt-n1": tagJlptN1,
			},
		},
	},
	plugins: [],
	safelist: [{ pattern: /text-tag-/ }, { pattern: /border-tag-/ }],
};

// '"Kaisei Tokumin"',
