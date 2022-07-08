/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts}"],
	theme: {
		extend: {
			fontFamily: {
				body: ['"Exo 2"', '"Yuji Syuku"', "sans-serif"],
			},
			backgroundImage: {
				logo: "url('/favicon-96x96.png')",
			},
		},
	},
	plugins: [],
};

// '"Kaisei Tokumin"',
