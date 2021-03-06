/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';
import { xIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-button';
import '../lib/lwdc-tooltip';
import { action } from '@storybook/addon-actions';
import { ButtonType } from '../lib/lwdc-button';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-tooltip',
	decorators: [withKnobs]
};



export const tooltipStory = () => {
	return html`<lwdc-tooltip message="Close">
					<lwdc-button .type=${ButtonType.iconCircle}  @click=${() => { console.log("clicked"); action("Element Button Clicked"); }}>

						 <lwdc-icon .icon=${xIcon} ></lwdc-icon>
					</lwdc-button>

				</lwdc-tooltip>`;
}

tooltipStory.storyName =  'Tooltip';
tooltipStory.parameters = { layout: 'centered' };
