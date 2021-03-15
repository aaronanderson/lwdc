import { LitElement, html, css, customElement, property } from 'lit-element';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import {CanvasTheme, themeElement, useTheme, defaultCanvasTheme} from '../lib/theme';

import colors from '@workday/canvas-colors-web';

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
			contrast: colors.blackPepper600,

		},
	},
};


const theme = ['default', 'custom'];
const themeOptions: Record<string, string> = theme.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const themeRadioKnob = () => radios("Theme", themeOptions, 'default') as any;
const themeMap = new Map([['default', defaultCanvasTheme], ['custom', customTheme]]);



export const themeStory = () => {

	return html`<lwdc-theme-example .theme=${themeMap.get(themeRadioKnob())}>Themed Component</lwdc-theme-example>`;
}

themeStory.storyName = 'Theme';
themeStory.parameters = { layout: 'centered' };





@customElement('lwdc-theme-example')
class ThemeSampleElement extends themeElement(LitElement) {

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
