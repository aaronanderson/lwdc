/* eslint-disable import/extensions */
import { html } from 'lit-html';
import { html as html2} from 'lit';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-combobox';
import '../lib/lwdc-menu-item';
import { RadiosTypeOptionsProp } from '@storybook/addon-knobs/dist/components/types';


loadWDCFonts();


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-select',
	decorators: [withKnobs]
};


//const options = [{ 'id': '1', 'name': 'Option 1' }, { 'id': '2', 'name': 'Option 2' }, { 'id': '3', 'name': 'Option 3' }];
const options: Array<any> = Array.from(Array(100)).map((_, i) => { let sp = i % 2 == 0 ? ' ' : ''; return { name: `Entry ${i} XXXXXXXXX${sp}XXXXXXXXXXXXXXXXXXX${sp}XXXXXXXXXXXXXXXXXXXX${sp}XXXXXXXXXX`, id: i } });
const groupOptions: Array<any>= [ {header: html2 `<lwdc-menu-item><b>Group 1</b></lwdc-menu-item>`, items:[{name: 'Entry 1', id: `1`}]},
								  {header: html2 `<lwdc-menu-item><b>Group 2</b></lwdc-menu-item>`, items:[{name: 'Entry 3', id: `4`}]},	
								  {header: html2 `<lwdc-menu-item><b>Group 3</b></lwdc-menu-item>`, items:[{name: 'Entry 5', id: `6`}]},
								]; 
const selected = new Set();
selected.add(options[1]);

const mode = ['regular', 'group'];
const modeOptions: RadiosTypeOptionsProp<string> = mode.reduce((r: RadiosTypeOptionsProp<string>, e: string) => { r[e] = e; return r; }, {});
const modesRadioKnob = () => radios("Mode", modeOptions, 'regular') as any;
const modeMap = new Map([['regular', options], ['group', groupOptions]]);

const width = ['default', '500px', '100%'];
const widthOptions: RadiosTypeOptionsProp<string> = width.reduce((r: RadiosTypeOptionsProp<string>, e: string) => { r[e] = e; return r; }, {});
const widthsRadioKnob = () => radios("Width", widthOptions, 'default') as any;
const widthMap = new Map([['default', 'unset'], ['500px', '500px'], ['100%', '100%']]);

const wrapBox = () => boolean("Wrap", false);
const multiBox = () => boolean("Multiple", true);

export const comboboxStory = () => {
	return html`<lwdc-form-field label="Selection">
						<lwdc-combobox name="selection" required  .options=${modeMap.get(modesRadioKnob())} .selected=${selected} .selectedWidth=${widthMap.get(widthsRadioKnob())} ?wrap=${wrapBox()} ?multiple=${multiBox()} @lwdc-combobox-change=${(e : CustomEvent)=> console.log("selection change", e.detail?.selected)}></lwdc-combobox>
					</lwdc-form-field>
				`;
}

comboboxStory.storyName =  'Combobox';
comboboxStory.parameters = { layout: 'centered' };
