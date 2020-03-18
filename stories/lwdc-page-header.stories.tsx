/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { exportIcon, fullscreenIcon } from '@workday/canvas-system-icons-web';


import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-page-header';
import '../lib/lwdc-button';
import '../lib/lwdc-icon';
import { ButtonType } from '../lib/lwdc-button';

loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-page-header',
	decorators: [withKnobs, center]
};

export const pageHeaderStory = () => {
	return html`<lwdc-page-header style="width:100%" title="Page Header" sub-title="Page Sub-Header">
						<lwdc-button .type=${ButtonType.iconInverse}>
							<lwdc-icon .icon=${exportIcon} color="frenchVanilla100"></lwdc-icon>
						</lwdc-button>
						<lwdc-button .type=${ButtonType.iconInverse}>
							<lwdc-icon .icon=${fullscreenIcon} color="frenchVanilla100"></lwdc-icon>
						</lwdc-button>
	
	</lwdc-page-header>`;
}
pageHeaderStory.story = {
	name: 'Page Header'
}

