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
			//wait for update to lit
		  //{
		  //		loader: 'lit-css-loader',
		  //	},
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
				options: {
					 implementation: require("node-sass"),
				}
			},

		],

	});
	config.resolve.extensions.push('.ts', '.tsx', '.js');
	return config;
};
