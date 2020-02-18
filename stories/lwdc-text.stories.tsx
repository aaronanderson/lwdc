/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-text';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-text',
	decorators: [withKnobs, center]
};


export const textStory = () => {
	return html`<lwdc-form-field label="Selection">
						<lwdc-text name="selection" required></lwdc-text>
					</lwdc-form-field>
				`;
}
textStory.story = {
	name: 'Text'
}

