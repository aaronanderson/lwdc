const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode : 'production',
	entry : {
		index : './lib/index.ts',
		'lwdc-button' : './lib/lwdc-button.ts',
		'lwdc-checkbox' : './lib/lwdc-checkbox.ts',
		'lwdc-combobox' : './lib/lwdc-combobox.ts',
		'lwdc-env-label' : './lib/lwdc-env-label.ts',
		'lwdc-fonts' : './lib/lwdc-fonts.ts',
		'lwdc-form-field' : './lib/lwdc-form-field.ts',
		'lwdc-header' : './lib/lwdc-header.ts',
		'lwdc-icon' : './lib/lwdc-icon.ts',
		'lwdc-icon-inject' : './lib/lwdc-icon-inject.ts',
		'lwdc-loading' : './lib/lwdc-loading.ts',
		'lwdc-menu' : './lib/lwdc-menu.ts',
		'lwdc-popper' : './lib/lwdc-popper.ts',
		'lwdc-radio' : './lib/lwdc-radio.ts',
		'lwdc-select' : './lib/lwdc-select.ts',
		'lwdc-side-panel' : './lib/lwdc-side-panel.ts',
		'lwdc-table' : './lib/lwdc-table.ts',
		'lwdc-tabs' : './lib/lwdc-tabs.ts',
		'lwdc-text' : './lib/lwdc-text.ts',
		'lwdc-textarea' : './lib/lwdc-textarea.ts',
		'lwdc-toast' : './lib/lwdc-toast.ts',
		'lwdc-tooltip' : './lib/lwdc-tooltip.ts',
	},
	resolve : {
		extensions : [ '.tsx', '.ts', '.js' ],
	},

	output : {
		path : path.resolve('dist'),
		filename : '[name].js',
	},

	module : {
		rules : [

		{
			test : /\.ts(x?)$/,
			loaders : [ 'ts-loader' ]
		},

		{
			test : /\.(jpg|png)$/,
			use : {
				loader : "file-loader",

				options : {
					name : "assets/[name].[ext]",
				},
			}
		}, {
			test : /\.scss$/,
			use : [ {
				loader : 'raw-loader',
			}, {
				loader : "sass-loader",
				options : {
					sassOptions : {
						includePaths : [ './node_modules' ]
					}
				}
			}, ]
		}

		]
	}

};
