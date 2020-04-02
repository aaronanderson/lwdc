/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-combobox';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-select',
	decorators: [withKnobs, center]
};


//const options = [{ 'id': '1', 'name': 'Option 1' }, { 'id': '2', 'name': 'Option 2' }, { 'id': '3', 'name': 'Option 3' }];
const options: Array<any> = Array.from(Array(100)).map((_, i) => { let sp = i % 2 == 0 ? ' ' : ''; return { name: `Entry ${i} XXXXXXXXX${sp}XXXXXXXXXXXXXXXXXXX${sp}XXXXXXXXXXXXXXXXXXXX${sp}XXXXXXXXXX`, id: i } });
const selected = new Set();
selected.add(options[1]); 

const width = ['default', '500px', '100%'];
const widthOptions: Record<string, string> = width.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const widthsRadioKnob = () => radios("Width", widthOptions, 'default') as any;
const widthMap = new Map([['default', 'unset'], ['500px', '500px'], ['100%', '100%']]);

const wrapBox = () => boolean("Wrap", false);

export const comboboxStory = () => {
	return html`<lwdc-form-field label="Selection">
						<lwdc-combobox name="selection" required  .options=${options} .selected=${selected} .selectedWidth=${widthMap.get(widthsRadioKnob())} ?wrap=${wrapBox()}></lwdc-combobox>
					</lwdc-form-field>
				`;
}
comboboxStory.story = {
	name: 'Combobox'
}

