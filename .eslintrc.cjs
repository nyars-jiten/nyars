/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2022: true,
	},
	extends: [
		"eslint:recommended",

		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-recommended",
		"plugin:tailwindcss/recommended",

		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier",
	],
	plugins: ["@typescript-eslint", "tailwindcss"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

		// "@typescript-eslint/no-unused-vars": [
		// 	"warn",
		// 	{
		// 		argsIgnorePattern: "^_$",
		// 	},
		// ],
	},
	globals: {
		defineProps: "readonly",
		defineEmits: "readonly",
		defineExpose: "readonly",
		withDefaults: "readonly",
	},
};
