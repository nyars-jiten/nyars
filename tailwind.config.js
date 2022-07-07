/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts}"],
	theme: {
		extend: {
			backgroundImage: {
				logo: "url('/favicon-96x96.png')",
			},
		},
	},
	plugins: [],
};
