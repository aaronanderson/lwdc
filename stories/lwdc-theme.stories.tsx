import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {html as html2} from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import {CanvasTheme, useTheme, defaultCanvasTheme} from '../lib/theme';

import colors from '@workday/canvas-colors-web';
import { RadiosTypeOptionsProp } from '@storybook/addon-knobs/dist/components/types';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	decorators: [withKnobs]
};


const customTheme = {
	palette: {
		primary: {
			main: colors.greenApple400,
			contrast: colors.blackPepper600,

			lightest: colors.greenApple100,
			light: colors.greenApple200,
			//main: colors.greenApple400,
			dark: colors.greenApple500,
			darkest: colors.greenApple600,

		},
	},
};


const theme = ['default', 'custom'];
const themeOptions: RadiosTypeOptionsProp<string> = theme.reduce((r: RadiosTypeOptionsProp<string>, e: string) => { r[e] = e; return r; }, {});
const themeRadioKnob = () => radios("Theme", themeOptions, 'default') as any;
const themeMap = new Map([['default', defaultCanvasTheme], ['custom', customTheme]]);



export const themeStory = () => {

	return html2`<lwdc-theme-example .theme=${themeMap.get(themeRadioKnob())}>Themed Component</lwdc-theme-example>`;
}

themeStory.storyName = 'Theme';
themeStory.parameters = { layout: 'centered' };





@customElement('lwdc-theme-example')
class ThemeSampleElement extends LitElement {

	@property({ type: Object })
	theme?: CanvasTheme;

  static get styles() {
		return [css`
				h3 {
					background: var(--lwdc-theme-primary-main);
    			color: var(--lwdc-theme-primary-contrast);
    			border-radius: 4px;
    			padding: 12px;
    			display: inline-block;
				}

			`];
  }

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("theme") && this.theme) {
			useTheme(this.theme);
		}
  }

  render() {
		return html`<h3><slot></slot></h3>`;
   }


}
