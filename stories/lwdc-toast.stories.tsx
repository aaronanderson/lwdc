/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-toast';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-toast',
	decorators: [withKnobs, center]
};


export const toastStory = () => {
	return html`<lwdc-toast message="Message" action-text="Action Text"></lwdc-toast>
	<lwdc-button @click=${(e: Event) => { ((e.target as HTMLElement).parentElement.querySelector("lwdc-toast") as any).open(); }}>Open</lwdc-button>
				`;
}

toastStory.story = {
	name: 'Toast'
}

