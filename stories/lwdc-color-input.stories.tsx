/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-color-input';

loadWDCFonts();


export default {
	title: 'LitElement Workday Canvas Kit Web Components/Color Picker',
	component: 'lwdc-color-input',
	decorators: [withKnobs]
};


export const colorInputStory = () => {
	return html`<lwdc-form-field label="Color Input">
						<lwdc-color-input name="color" required></lwdc-color-input>
					</lwdc-form-field>
				`;
}

colorInputStory.storyName = 'Color Input';
colorInputStory.parameters = { layout: 'centered' };

export const colorPreviewStory = () => {
	return html`<lwdc-form-field label="Color Preview">
						<lwdc-color-input name="color" value="ABABAB" show-check preview required></lwdc-color-input>
					</lwdc-form-field>
				`;
}

colorPreviewStory.storyName = 'Color Preview';
colorPreviewStory.parameters = { layout: 'centered' };
