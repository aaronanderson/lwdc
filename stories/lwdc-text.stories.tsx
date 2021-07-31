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

const textTypeOptions = {
	Text: 'text',
	Password: 'password',
	Search: 'search',
	Number: 'number',
	Range: 'range',
	Email: 'email',
	Telephone: 'tel',
	URL: 'url',
	File: 'file',
	Image: 'image',
	Date: 'date',
	DateTimeLocal: 'datetime-local',
	Time: 'time',
	Month: 'month',
	Color: 'color',
	
  };

const textTypeRadioKnob = () => radios("Text Type", textTypeOptions, 'text') as any;


export const textStory = () => {
	return html`<lwdc-form-field label="Text">
						<lwdc-text name="text" .inputType=${textTypeRadioKnob()} required @lwdc-text-change=${(e: CustomEvent)=> console.log("text changed", e.detail?.value)}></lwdc-text>
					</lwdc-form-field>
				`;
}

textStory.storyName = 'Text';
textStory.parameters = { layout: 'centered' };
