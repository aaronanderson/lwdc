/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-text';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-text',
	decorators: [withKnobs]
};


export const textStory = () => {
	return html`<lwdc-form-field label="Text">
						<lwdc-text name="text" required @lwdc-text-change=${(e: CustomEvent)=> console.log("text changed", e.detail?.value)}></lwdc-text>
					</lwdc-form-field>
				`;
}

textStory.storyName = 'Text';
textStory.parameters = { layout: 'centered' };
