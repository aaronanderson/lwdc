/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

import '../lib/lwdc-loading';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-loading',
	decorators: [withKnobs, center]
};

export const loadingStory = () => {
	return html`<h3 class="wdc-type-h3" style="margin-right: 24px;">Loading</h3><lwdc-loading loading title="Explanation"></lwdc-loading>`;
}
loadingStory.story = {
	name: 'Loading'
}

