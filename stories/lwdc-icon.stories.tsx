import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';


import { xIcon, filterIcon, uploadCloudIcon, homeIcon, activityStreamIcon } from '@workday/canvas-system-icons-web';

import '../lib/lwdc-icon';
import '../lib/lwdc-icon-inject';
import { customElement, LitElement, property, css } from 'lit-element';

//https://storybook.js.org/docs/formats/component-story-format/
//https://design.workday.com/tokens/assets/icons/icon-guidelines
export default {
	title: 'LitElement Workday Canvas Kit Web Components/Icon',
	component: 'lwdc-icon',
	decorators: [withKnobs]
};



const icons = ['x', 'filter', 'uploadCloud', 'home', 'activity'];
const iconOptions: Record<string, string> = icons.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const iconsRadioKnob = () => radios("Icon", iconOptions, 'x') as any;
const iconMap = new Map([['x', xIcon], ['filter', filterIcon], ['uploadCloud', uploadCloudIcon], ['home', homeIcon], ['activity', activityStreamIcon]]);

const iconSizes = ['24', '48', '72'];
const iconSizeOptions: Record<string, string> = iconSizes.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const iconSizesRadioKnob = () => radios("Size", iconSizeOptions, '24') as any;

const iconColors = ['licorice200', 'blueberry500', 'chiliMango200'];
const iconColorOptions: Record<string, string> = iconColors.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const iconColorsRadioKnob = () => radios("Color", iconColorOptions, 'licorice200') as any;

const iconBackgroundColors = ['transparent', 'licorice200', 'blueberry500', 'chiliMango200'];
const iconBackgroundColorOptions: Record<string, string> = iconBackgroundColors.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const iconBackgroundColorsRadioKnob = () => radios("Background", iconBackgroundColorOptions, 'transparent') as any;


export const iconStory = () => {
	return html`<p style="margin: 10px;">Icon</p> <lwdc-icon .icon=${iconMap.get(iconsRadioKnob())} .size=${iconSizesRadioKnob()} .color=${iconColorsRadioKnob()} .background=${iconBackgroundColorsRadioKnob()}></lwdc-icon>`;
}

iconStory.storyName = 'Icon';
iconStory.parameters = { layout: 'centered' };

export const injectIconStory = () => {
	return html`<p style="margin: 10px;">Icon Inject</p> <lwdc-icon-inject  data-icon=${iconsRadioKnob()} data-category="system" data-size=${iconSizesRadioKnob()} data-color=${iconColorsRadioKnob()}> </lwdc-icon-inject>`;
}

injectIconStory.storyName = 'Icon Inject';
injectIconStory.parameters = { layout: 'centered' };
