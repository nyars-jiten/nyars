const colors = require("tailwindcss/colors");

const tagLevel1 = colors.orange;
const tagLevel2 = colors.amber;
const tagLevel3 = colors.emerald;
const tagLevel4 = colors.teal;
const tagLevel5 = colors.cyan;
const tagLevel6 = colors.sky;
const tagLevel7 = colors.blue;
const tagLevel8 = colors.indigo;
const tagLevel9 = colors.violet;
const tagLevel10 = colors.fuchsia;
const tagCommon = colors.gray;

const tagShou = colors.teal;
const tagChuu = colors.amber;
const tagKou = colors.orange;
const tagKanon = colors.slate;
const tagTouon = colors.slate;
const tagGoon = colors.slate;
const tagKanyoon = colors.slate;
const tagSouon = colors.slate;
const tagGai = colors.blue;

const statusVariant1 = "#1d90b3"; // New
const statusVariant2 = "#b31d1d"; // Declined
const statusVariant3 = "#1db336"; // Accepted
const statusVariant4 = "#b3b3b3"; // Auto-accepted
const statusVariant5 = "#aa1db3"; // Reverted

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				header: ['"Exo 2"', '"Yuji Syuku"', "Arial", "sans-serif"],
				body: ['"Exo 2"', '"Kosugi"', "Arial", "sans-serif"],
			},
			backgroundImage: {
				"logo-light": "url('/favicon-96x96.png')",
				"logo-dark": "url('/favicon-dark-96x96.png')",
			},
			colors: {
				accent: {
					100: "#e1edee",
					200: "#c3dadd",
					300: "#a6c8cd",
					400: "#88b5bc",
					500: "#6aa3ab",
					600: "#558289",
					700: "#406267",
					800: "#2a4144",
					900: "#152122",
				},

				gray: colors.zinc,

				"tag-common": tagCommon,
				"tag-jyouyou": colors.slate,
				insatsu: colors.slate,
				jinmeiyou: colors.slate,
				"tag-level-1": tagLevel1,
				"tag-level-2": tagLevel2,
				"tag-level-3": tagLevel3,
				"tag-level-4": tagLevel4,
				"tag-level-5": tagLevel5,
				"tag-level-6": tagLevel6,
				"tag-level-7": tagLevel7,
				"tag-level-8": tagLevel8,
				"tag-level-9": tagLevel9,
				"tag-level-10": tagLevel10,
				"tag-shou": tagShou,
				"tag-chuu": tagChuu,
				"tag-kou": tagKou,
				"tag-kanon": tagKanon,
				"tag-souon": tagSouon,
				"tag-touon": tagTouon,
				"tag-goon": tagGoon,
				"tag-kanyoon": tagKanyoon,
				"tag-gai": tagGai,

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
