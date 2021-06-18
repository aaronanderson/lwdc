/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';


import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-card';

loadWDCFonts();


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-card',
	decorators: [withKnobs]
};

export const cardStory = () => {
	return html`

				<section>
					<lwdc-card title="Card Header">
							.wdc-card
					</lwdc-card>
					<lwdc-card-container>
						<lwdc-card title="Card Header" size="3">
							.wdc-card-3
						</lwdc-card>
						<lwdc-card title="Card Header" size="3">
							.wdc-card-3
						</lwdc-card>
						<lwdc-card title="Card Header" size="6">
							.wdc-card-6
						</lwdc-card>
						<lwdc-card title="Card Header" size="4">
							.wdc-card-4
						</lwdc-card>
					</lwdc-card-container>
				</section>
				`;
}

cardStory.storyName =  'Card';
cardStory.parameters = { layout: 'centered' };
