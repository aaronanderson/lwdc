const path = require('path');
module.exports = ({ config }) => {
	config.devtool = "source-maps";

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
				loader: 'sass-loader',
			}, 

		],

	});
	config.resolve.extensions.push('.ts', '.tsx', '.js');
	return config;
};
