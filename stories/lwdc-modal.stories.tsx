/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-modal';
import '../lib/lwdc-button';
import { ButtonType } from '../lib/lwdc-button';

loadWDCFonts();

export const modalStory = () => {
	return html`<lwdc-modal title="Delete Item">
					<div style="margin-bottom: 24px;">Are you sure you'd like to delete the item titled 'My Item'?</div>
					<div>
						<lwdc-button style="margin-right: 16px;" .type=${ButtonType.delete} @click=${(e: Event) => { ((e.target as HTMLElement).closest("lwdc-modal") as any).close(); }}>Delete</lwdc-button>
						<lwdc-button .type=${ButtonType.default} @click=${(e: Event) => { ((e.target as HTMLElement).closest("lwdc-modal") as any).close(); }}>Cancel</lwdc-button>
					</div>
				</lwdc-modal>
				<lwdc-button @click=${(e: Event) => { (document.querySelector("lwdc-modal") as any).open(); }}>Open</lwdc-button>
				`;
}

modalStory.storyName = 'Modal';
modalStory.parameters = { layout: 'centered' };
modalStory.component = 'lwdc-modal';
modalStory.decorators= [withKnobs];
