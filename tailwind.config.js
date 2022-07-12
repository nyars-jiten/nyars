const tagJlptN1 = "#ea2a92";
const tagJlptN2 = "#f99717";
const tagJlptN3 = "#84bf26";
const tagJlptN4 = "#459f94";
const tagJlptN5 = "#3273bb";
const tagCommon = "gray";

const statusVariant1 = "#1d90b3"; // New
const statusVariant2 = "#b31d1d"; // Declined
const statusVariant3 = "#1db336"; // Accepted
const statusVariant4 = "#b3b3b3"; // Auto-accepted
const statusVariant5 = "#aa1db3"; // Reverted

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

				"status-variant-1": statusVariant1,
				"status-variant-2": statusVariant2,
				"status-variant-3": statusVariant3,
				"status-variant-4": statusVariant4,
				"status-variant-5": statusVariant5,

				"type-variant-1": "#1db336", // New
				"type-variant-2": "#1d90b3", // Edit
				"type-variant-3": "#b31d1d", // Delete
				"type-variant-4": "#a520c7", // Transfer
				"type-variant-5": "#aa1db3", // Reverted
			},
		},
	},
	plugins: [],
	safelist: [
		"before:content-['「']",
		"after:content-['」']",

		"before:content-['【']",
		"after:content-['】']",

		{ pattern: /border-status-variant-/ },
		{ pattern: /text-type-variant-/ },
		{ pattern: /text-status-variant-/ },
		{ pattern: /text-tag-/ },
		{ pattern: /border-tag-/ },
	],
};

// '"Kaisei Tokumin"',
