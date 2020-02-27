/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-checkbox';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components/Checkbox',
	component: 'lwdc-checkbox',
	decorators: [withKnobs, center]
};


export const checkboxStory = () => {
	return html`<lwdc-form-field label="Checkbox">
						<lwdc-checkbox name="checkbox" label="E-Mail"></lwdc-checkbox>
					</lwdc-form-field>
				`;
}
checkboxStory.story = {
	name: 'Default'
}


export const checkboxGroupStory = () => {
	return html`<div class="wdc-form wdc-form-label-position-left">
					<lwdc-form-field group label="Checkbox Group">

							<lwdc-checkbox name="email" label="E-Mail"></lwdc-checkbox>
							<lwdc-checkbox name="phone" label="Phone"></lwdc-checkbox>
							<lwdc-checkbox disabled name="fax" label="Fax"></lwdc-checkbox>
							<lwdc-checkbox name="mail" label="Mail"></lwdc-checkbox>

					</lwdc-form-field>
				</div>
				`;
}
checkboxGroupStory.story = {
	name: 'Group'
}

