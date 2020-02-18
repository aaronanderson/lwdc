const path = require('path');
module.exports = ({ config }) => {
	config.devtool = "source-maps";
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: require.resolve('ts-loader')
			}
		],
	});
	config.module.rules.push({
		test: /\.scss$/,
		use: [
			{
				loader: require.resolve('raw-loader')
			},
			{
				loader: require.resolve('sass-loader'),
				options: {
					sassOptions: { includePaths: ['../node_modules'] }
				}
			}],

	});
	config.resolve.extensions.push('.ts', '.tsx', '.js');
	return config;
};
