/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-textarea';

loadWDCFonts();


export const textareaStory = () => {
	return html`<lwdc-form-field label="Text Area">
						<lwdc-textarea name="textarea" required @lwdc-textarea-change=${(e)=>console.log("textarea changed", e.detail.value)}></lwdc-textarea>
					</lwdc-form-field>
				`;
}

textareaStory.storyName =  'Textarea';
textareaStory.parameters = { layout: 'centered' };
textareaStory.component = 'lwdc-textarea';
textareaStory.decorators= [withKnobs];
