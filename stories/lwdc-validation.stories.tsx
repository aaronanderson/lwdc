/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { closestElement } from '../lib/util';

import '../lib/lwdc-action-bar';
import '../lib/lwdc-form';
import '../lib/lwdc-form-field';
import '../lib/lwdc-combobox';
import '../lib/lwdc-text';
import '../lib/lwdc-textarea';
import '../lib/lwdc-radio';
import '../lib/lwdc-checkbox';

import { ErrorType } from '../lib/lwdc-form-field';





loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-text',
	decorators: [withKnobs, center]
};


const options = [{ 'id': '1', 'name': 'Option 1' }, { 'id': '2', 'name': 'Option 2' }, { 'id': '3', 'name': 'Option 3' }];
export const validationStory = () => {
	return html`<lwdc-form>
					<lwdc-form-field label="Selection"  .errorType=${ErrorType.alert}>
						<lwdc-combobox name="selection" required  .options=${options}></lwdc-combobox>
					</lwdc-form-field>

					<lwdc-form-field label="Text">
							<lwdc-text name="text" required></lwdc-text>
					</lwdc-form-field>

					<lwdc-form-field label="Text Area">
						<lwdc-textarea name="textarea" required></lwdc-textarea>
					</lwdc-form-field>

					<lwdc-form-field label="Radio">
						<lwdc-radio name="radio" label="E-Mail" required></lwdc-radio>
					</lwdc-form-field>

					<lwdc-form-field label="Checkbox">
						<lwdc-checkbox name="checkbox" label="E-Mail" required></lwdc-checkbox>
					</lwdc-form-field>

					<lwdc-action-bar>
						<lwdc-button  @click=${validate}>Validate</lwdc-button>
						<lwdc-button  @click=${reset}>Rest</lwdc-button>
					</lwdc-action-bar>
				</lwdc-form>
				`;
}
validationStory.story = {
	name: 'Validation'
}

const validate = (e: Event) => {
	const form = (closestElement('lwdc-form', (e.target as HTMLElement)) as any);
	if (form.validate()) {
		console.log('Text: ', form.item('text')!.value);
	}
}

const reset = (e: Event) => {
	const form = (closestElement('lwdc-form', (e.target as HTMLElement)) as any);
	form.reset();
}
