export default [
	{
		rules: {
			semi: 'error',
			'prefer-const': 'error',
		},
		extends: [
			'@babel/plugin-transform-private-property-in-object',
			'next/core-web-vitals',
		],
	},
]
