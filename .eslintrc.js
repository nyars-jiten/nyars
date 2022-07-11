module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
		"@vue/typescript/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

		// note you must disable the base rule as it can report incorrect errors
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
	},
};
