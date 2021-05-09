const path = require('path');
module.exports = ({ config }) => {
	config.devtool = "eval";

	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: 'ts-loader'
			}
		],
	});
	config.module.rules.push({
		test: /\.scss$/,
		use: [
			{
				loader: 'raw-loader',
			},
			{
				loader: 'postcss-loader',
				options: {
          postcssOptions: {
            plugins: [
              [
                "postcss-inline-svg",
              ],
            ],
          },
				},
			},
			{
				loader: 'sass-loader',
			},

		],

	});
	config.resolve.extensions.push('.ts', '.tsx', '.js');
	return config;
};
