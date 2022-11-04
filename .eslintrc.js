module.exports = {
	root: true,
	env: {
		node: true,
	},
	plugins: ["tailwindcss"],
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"@vue/eslint-config-prettier",
		"@vue/eslint-config-typescript/recommended",
		"plugin:tailwindcss/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
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
