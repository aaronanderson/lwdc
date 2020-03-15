/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-sidepanel';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; flex-flow: column; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-sidepanel',
	decorators: [withKnobs, center]
};

export const sidepanelStory = () => {
	return html`<lwdc-sidepanel>
		
				</lwdc-sidepanel>
				`;
}
sidepanelStory.story = {
	name: 'Side Panel'
}



