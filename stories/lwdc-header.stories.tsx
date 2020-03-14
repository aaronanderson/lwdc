/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-header';
import '../lib/lwdc-button';
import { ButtonType } from '../lib/lwdc-button';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; flex-flow: column; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-header',
	decorators: [withKnobs, center]
};



export const headerStory = () => {
	return html`<lwdc-header title="Sample Header" style="width: 100%">
		<lwdc-button .type=${ButtonType.iconCircleFilled}><lwdc-icon .icon=${userIcon}></lwdc-icon> </lwdc-button>
	</lwdc-header>
				`;
}
headerStory.story = {
	name: 'Header'
}



