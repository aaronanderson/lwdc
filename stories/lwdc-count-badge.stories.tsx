/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

import '../lib/lwdc-count-badge';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');


export const countBadgeStory = () => {
	return html`<div style="padding: 10px;">
								<lwdc-count-badge count="999"></lwdc-count-badge>
							</div>
							<div style="padding: 10px;">
								<lwdc-count-badge count="999" inverse></lwdc-count-badge>
							</div>	`;
}

countBadgeStory.storyName = 'Count Badge';
countBadgeStory.parameters = { layout: 'centered' };
countBadgeStory.component = 'lwdc-count-badge';
countBadgeStory.decorators= [withKnobs];
