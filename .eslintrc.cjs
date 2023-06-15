module.exports = {
	env: { browser: true, es2020: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
	plugins: ['react', 'react-hooks', 'react-refresh', 'prettier'],
	rules: {
		'react-refresh/only-export-components': 'off',
		// eslint (http://eslint.cn/docs/rules)
		'no-var': 'error',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-use-before-define': 'off',
		'prefer-const': 'off',
		'no-irregular-whitespace': 'off',
		'jsx-quotes': 'off',
		'no-console': ['warn', { allow: ['warn', 'error'] }],

		// react (https://github.com/jsx-eslint/eslint-plugin-react)
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'off',
		'react/prop-types': 'off',
		'react/display-name': 'off',
		'@typescript-eslint/no-unused-vars': 'error',

		'no-unused-vars': 'warn' // 可调试但不可提交
	}
};
