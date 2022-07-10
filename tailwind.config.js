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
		},
	},
	plugins: [],
};

// '"Kaisei Tokumin"',
