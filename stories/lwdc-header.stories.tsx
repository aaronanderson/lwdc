/* eslint-disable import/extensions */
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { userIcon } from '@workday/canvas-system-icons-web';
import {colors} from '@workday/canvas-colors-web';

import {hexToRgb} from '../lib/util';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import {HeaderTheme, HeaderVariant} from '../lib/lwdc-header';
import '../lib/lwdc-header';
import '../lib/lwdc-button';
import { ButtonType } from '../lib/lwdc-button';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-header',
	decorators: [withKnobs]
};

const themeColor = ['white', 'dark', 'transparent'];
const themeColorOptions: Record<string, string> = themeColor.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const themeColorRadioKnob = () => radios("Theme", themeColorOptions, 'dark') as any;
const themeColorMap = new Map([['white', HeaderTheme.White], ['dark', HeaderTheme.Dark], ['transparent', HeaderTheme.Transparent]]);

const bgImg = 'https://raw.githubusercontent.com/Workday/canvas-kit/master/modules/_labs/header/react/static/workday-bg.jpg';

export const headerStory = () => {
	let theme = themeColorMap.get(themeColorRadioKnob());

	let containerClass = {
		'container': true,
		'header-background':theme == HeaderTheme.Transparent
	}

	return html`
  <style>
	.container {
		background-color: ${colors.soap100};
  	padding: 24px;
	}
	.header-background {
		padding: 0 0 64px 0;
		background: linear-gradient( rgba(${hexToRgb(colors.blueberry500)}, 0.8), rgba(${hexToRgb(colors.blueberry400)}, 0.8)), url(${bgImg});
		background-position: 0 50%;
		background-size: cover;
	}
	</style>

	<div class="${classMap(containerClass)}">
		<lwdc-header title="Sample Header" style="width: 100%" .theme=${theme}>
			<nav>
				<ul>
					<li class="current">
						<a href="#" >Discover</a>
					</li>
					<li>
						<a href="#">Library</a>
					</li>
					<li>
						<a href="#">Create</a>
					</li>
					<li>
						<a href="#">Manage</a>
					</li>
				</ul>
			</nav>
			<lwdc-button .type=${ButtonType.iconCircleFilled}><lwdc-icon .icon=${userIcon}></lwdc-icon> </lwdc-button>

		</lwdc-header>
	</div>
				`;
}

headerStory.storyName = 'Header';
headerStory.parameters = { layout: 'centered' };
