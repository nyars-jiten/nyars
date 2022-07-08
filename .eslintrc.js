module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		ecmaVersion: "latest",
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ["prettier", "@typescript-eslint", "tailwindcss"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:vue/vue3-recommended",
	],
	rules: {
		"no-unused-vars": "off",
		indent: ["error", "tab"],
		"@typescript-eslint/indent": ["error", "tab"],
		"vue/script-indent": ["error", "tab"],
		"vue/html-indent": ["error", "tab"],
	},
};
