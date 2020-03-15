/* eslint-disable import/extensions */
import { html, render } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';


import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-tabs';


loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; flex-flow: column; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-tabs',
	decorators: [withKnobs, center]
};

const tabActivated = (e: CustomEvent) => {
	console.log('Tab Activated', e.detail.index, e.target);
	render(html`<span>Content ${e.detail.index + 1}</span>`, e.target as HTMLElement);
 }

export const tabsStory = () => {
	return html`<lwdc-tabs style="width: 75%;" .tabs=${['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4']} @lwdc-tab-activated=${tabActivated}></lwdc-tabs>
				`;
}
tabsStory.story = {
	name: 'Tabs'
}



