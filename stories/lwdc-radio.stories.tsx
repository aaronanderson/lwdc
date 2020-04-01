/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-radio';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components/Radio',
	component: 'lwdc-radio',
	decorators: [withKnobs, center]
};


export const radioStory = () => {
	return html`<lwdc-form-field label="Radio">
						<lwdc-radio name="radio" label="E-Mail"></lwdc-radio>
					</lwdc-form-field>
				`;
}
radioStory.story = {
	name: 'Default'
}


export const radioGroupStory = () => {
	return html`<div class="wdc-form wdc-form-label-position-left">
					<lwdc-form-field group="contact" label="Radio Group">

							<lwdc-radio  value="email" label="E-Mail" checked></lwdc-radio>
							<lwdc-radio  value="phone" label="Phone"></lwdc-radio>
							<lwdc-radio  value="fax"   label="Fax" disabled></lwdc-radio>
							<lwdc-radio  value="mail" label="Mail"></lwdc-radio>

					</lwdc-form-field>
				</div>
				`;
}
radioGroupStory.story = {
	name: 'Group'
}

