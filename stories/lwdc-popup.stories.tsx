/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-popup';
import '../lib/lwdc-button';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-popup',
	decorators: [withKnobs]
};

export const popupStory = () => {
	return html`<lwdc-popup style="position:absolute; top: 10px;">
					<h3>Welcome to your popup positioned by Popup!</h3>
				</lwdc-popup>
				<lwdc-button @click=${(e: Event) => { ((e.target as HTMLElement).parentElement.querySelector("lwdc-popup") as any).open(); }} style="margin-top: auto;">Open</lwdc-button>
				`;
}

popupStory.storyName = 'Popup';
popupStory.parameters = { layout: 'centered' };
