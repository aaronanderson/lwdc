/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-checkbox';




loadWDCFonts();


export default {
	title: 'LitElement Workday Canvas Kit Web Components/Checkbox',
	component: 'lwdc-checkbox',
	decorators: [withKnobs]
};


export const checkboxStory = () => {
	return html`<lwdc-form-field label="Checkbox">
						<lwdc-checkbox name="checkbox" label="E-Mail" @change=${(e: Event) => console.log(e.target)}></lwdc-checkbox>
					</lwdc-form-field>
				`;
}

checkboxStory.storyName = 'Default';
checkboxStory.parameters = { layout: 'centered' };



export const checkboxGroupStory = () => {
	return html`<div class="wdc-form wdc-form-label-position-left">
					<lwdc-form-field group label="Checkbox Group">

							<lwdc-checkbox name="email" label="E-Mail"></lwdc-checkbox>
							<lwdc-checkbox name="phone" label="Phone"></lwdc-checkbox>
							<lwdc-checkbox disabled name="fax" label="Fax"></lwdc-checkbox>
							<lwdc-checkbox name="mail" label="Mail" checked></lwdc-checkbox>

					</lwdc-form-field>
				</div>
				`;
}

checkboxGroupStory.storyName = 'Group';
checkboxGroupStory.parameters = { layout: 'centered' };
