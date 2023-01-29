module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"plugin:tailwindcss/recommended",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier",
	],
	plugins: ["tailwindcss"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_$",
			},
		],
	},
};
