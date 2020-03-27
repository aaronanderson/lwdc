/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-action-bar';
import '../lib/lwdc-button';
import { ButtonSize, ButtonType } from '../lib/lwdc-button';



loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="  margin: 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-button',
	decorators: [withKnobs, center]
};


const size = ['small', 'medium', 'large'];
const sizeOptions: Record<string, string> = size.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const sizesRadioKnob = () => radios("Size", sizeOptions, 'medium') as any;
const sizeMap = new Map([['small', ButtonSize.small], ['medium', ButtonSize.medium], ['large', ButtonSize.large]]);

const type = ['primary', 'secondary', 'delete'];
const typeOptions: Record<string, string> = type.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const typesRadioKnob = () => radios("Type", typeOptions, 'primary') as any;
const typeMap = new Map([['primary', ButtonType.primary], ['secondary', ButtonType.secondary], ['delete', ButtonType.delete]]);


export const buttonStory = () => {
	return html`<lwdc-action-bar>
					<lwdc-button .type=${typeMap.get(typesRadioKnob())} .size=${sizeMap.get(sizesRadioKnob())} @click=${() => { console.log("clicked"); action("Element Button Clicked"); }}>Click Me</lwdc-button>
				</lwdc-action-bar>`;
}
buttonStory.story = {
	name: 'Button'
}

