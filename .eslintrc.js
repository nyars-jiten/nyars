module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ["prettier", "@typescript-eslint", "tailwindcss"],
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"prettier",
		"plugin:@typescript-eslint/recommended",
	],
};
