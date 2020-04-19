/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";

import { xIcon, filterIcon, uploadCloudIcon, homeIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-status-indicator';

import { action } from '@storybook/addon-actions';
import { StatusIndicatorEmphasis, StatusIndicatorType } from '../lib/lwdc-status-indicator';



loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-status-indicator',
	decorators: [withKnobs, center]
};



const type = ['gray', 'orange', 'blue', 'green', 'red', 'transparent'];
const typeOptions: Record<string, string> = type.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const typesRadioKnob = () => radios("Type", typeOptions, 'gray') as any;
const typeMap = new Map([['gray', StatusIndicatorType.Gray], ['orange', StatusIndicatorType.Orange], ['blue', StatusIndicatorType.Blue], ['green', StatusIndicatorType.Green], ['red', StatusIndicatorType.Red], ['transparent', StatusIndicatorType.Transparent]]);

const emphasis = ['high', 'low'];
const emphasisOptions: Record<string, string> = emphasis.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const emphasisRadioKnob = () => radios("Size", emphasisOptions, 'high') as any;
const emphasisMap = new Map([['high', StatusIndicatorEmphasis.High], ['low', StatusIndicatorEmphasis.Low]]);

const icons = ['none', 'x', 'filter', 'uploadCloud', 'home'];
const iconOptions: Record<string, string> = icons.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const iconsRadioKnob = () => radios("Icon", iconOptions, 'none') as any;
const iconMap = new Map([['none', undefined], ['x', xIcon], ['filter', filterIcon], ['uploadCloud', uploadCloudIcon], ['home', homeIcon]]);


export const statusIndicatorStory = () => {
	return html`<lwdc-status-indicator label="Status Indicator" .type=${typeMap.get(typesRadioKnob())} .emphasis=${emphasisMap.get(emphasisRadioKnob())} .icon=${iconMap.get(iconsRadioKnob())}></lwdc-status-indicator > `;
}
statusIndicatorStory.story = {
	name: 'Status Indicator'
}

