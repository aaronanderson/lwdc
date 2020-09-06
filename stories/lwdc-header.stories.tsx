/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-header';
import '../lib/lwdc-button';
import { ButtonType } from '../lib/lwdc-button';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-header',
	decorators: [withKnobs]
};



export const headerStory = () => {
	return html`<lwdc-header title="Sample Header" style="width: 100%">
		<lwdc-button .type=${ButtonType.iconCircleFilled}><lwdc-icon .icon=${userIcon}></lwdc-icon> </lwdc-button>
	</lwdc-header>
				`;
}

headerStory.storyName = 'Header';
headerStory.parameters = { layout: 'centered' };
