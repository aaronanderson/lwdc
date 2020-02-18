/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-popper';
import '../lib/lwdc-button';



loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-popper',
	decorators: [withKnobs, center]
};



export const popperStory = () => {
	return html`<lwdc-popper>		
					<h3>Welcome to your popup positioned by Popper!</h3>
				</lwdc-popper>
				<lwdc-button @click=${(e: Event) => { ((e.target as HTMLElement).parentElement.querySelector("lwdc-popper") as any).open(); }}>Open</lwdc-button>
				`;
}
popperStory.story = {
	name: 'Popper'
}

