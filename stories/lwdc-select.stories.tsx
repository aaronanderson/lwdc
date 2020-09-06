/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-select';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-select',
	decorators: [withKnobs]
};


const selections = [{ 'id': '1', 'name': 'Option 1' }, { 'id': '2', 'name': 'Option 2' }, { 'id': '3', 'name': 'Option 3' }];
export const selectStory = () => {
	return html`<lwdc-form-field label="Selection">
						<lwdc-select name="selection" required  .options=${selections}></lwdc-select>
					</lwdc-form-field>
				`;
}

selectStory.storyName = 'Select';
selectStory.parameters = { layout: 'centered' };
