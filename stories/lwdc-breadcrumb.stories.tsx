/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

//import '../lib/lwdc-breadcrumbs';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');

export const breadCrumbsStory = () => {
	return html`<h3>TODO</h3>`;
}

breadCrumbsStory.storyName = 'Breadcrumbs';
breadCrumbsStory.parameters = { layout: 'centered' };
//breadCrumbsStory.component= 'lwdc-breadcrumbs';
breadCrumbsStory.decorators=  [withKnobs];
