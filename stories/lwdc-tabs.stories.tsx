/* eslint-disable import/extensions */
import { html, render } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';


import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-tabs';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-tabs',
	decorators: [withKnobs]
};

const tabActivated = (e: CustomEvent) => {
	render(html`<span>Content ${e.detail.index + 1}</span>`, e.target as HTMLElement);
 }

export const tabsStory = () => {
	return html`<lwdc-tabs style="width: 75%;" .tabs=${['First Tab', 'Second Tab', 'Third Tab']} @lwdc-tab-activated=${tabActivated}></lwdc-tabs>`;
}

tabsStory.storyName = 'Tabs';
tabsStory.parameters = { layout: 'centered' };
