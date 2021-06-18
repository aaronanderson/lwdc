/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

import '../lib/lwdc-form-field';
import '../lib/lwdc-switch';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	//component: 'lwdc-switch',
	decorators: [withKnobs]
};

const disabledBox = () => boolean("Disabled", false);

export const switchStory = () => {
	return html`<div class="wdc-form wdc-form-label-position-left">
								<lwdc-form-field label="Label">
										<lwdc-switch ?disabled=${disabledBox()}></lwdc-switch>
								</lwdc-form-field>
							</div>`;
}

switchStory.storyName = 'Switch';
switchStory.parameters = { layout: 'centered' };
