/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-action-bar';
import '../lib/lwdc-button';
import { ButtonSize, ButtonType, ButtonText } from '../lib/lwdc-button';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';



loadWDCFonts();



export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-button',
	decorators: [withKnobs]
};


const size = ['small', 'medium', 'large'];
const sizeOptions: Record<string, string> = size.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const sizesRadioKnob = () => radios("Size", sizeOptions, 'medium') as any;
const sizeMap = new Map([['small', ButtonSize.small], ['medium', ButtonSize.medium], ['large', ButtonSize.large]]);

const type = ['primary', 'default', 'delete', 'text'];
const typeOptions: Record<string, string> = type.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const typesRadioKnob = () => radios("Type", typeOptions, 'primary') as any;
const typeMap = new Map([['primary', ButtonType.primary], ['default', ButtonType.default], ['delete', ButtonType.delete], ['text', ButtonType.text]]);

const text = ['large', 'small', 'allCaps'];
const textOptions: Record<string, string> = text.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const textsRadioKnob = () => radios("Text", textOptions, 'large') as any;
const textMap = new Map([['large', ButtonText.large], ['small', ButtonText.small], ['allCaps', ButtonText.allCaps]]);

const drobdownBox = () => boolean("Dropdown", false);
const disabledBox = () => boolean("Disabled", false);
const inverseBox = () => boolean("Inverse", false);

const backgroundStyle = () => {
	return typesRadioKnob() === "text" && inverseBox() ? { 'background-color': '#0875e1' } : {};
}

export const buttonStory = () => {
	return html`
				<lwdc-action-bar>
					<div style="${styleMap(backgroundStyle())}">
						<lwdc-button .type=${typeMap.get(typesRadioKnob())} .size=${sizeMap.get(sizesRadioKnob())} .text=${textMap.get(textsRadioKnob())} @click=${() => { console.log("clicked"); action("Element Button Clicked"); }} ?disabled=${disabledBox()} ?dropdown=${drobdownBox()} ?inverse=${inverseBox()}>Click Me</lwdc-button>
					</div>
				</lwdc-action-bar>

				`;
}

buttonStory.storyName = 'Button';
buttonStory.parameters = { layout: 'centered' };
