/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-toast';


loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-toast',
	decorators: [withKnobs]
};


export const toastStory = () => {
	return html`<lwdc-toast message="Message" action-text="Action Text" style="position:absolute; top: 10px;"></lwdc-toast>
				<lwdc-button @click=${(e: Event) => {((e.target as HTMLElement).ownerDocument.querySelector("lwdc-toast") as any).open(); }} style="margin-top: auto;">Open</lwdc-button>
				`;
}

toastStory.storyName =  'Toast';
toastStory.parameters = { layout: 'centered' };
