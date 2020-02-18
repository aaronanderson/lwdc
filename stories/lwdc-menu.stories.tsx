/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-menu';
import '../lib/lwdc-menu-item';


loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-menu',
	decorators: [withKnobs, center]
};



export const menuStory = () => {
	return html`<lwdc-menu width="250px">		
					<lwdc-menu-item .icon=${uploadCloudIcon} selected> <a href="#">First Item</a></lwdc-menu-item>		
					<lwdc-menu-item .icon=${setupIcon}>Second Item with really really really long label</lwdc-menu-item>
					<lwdc-menu-item .icon=${uploadCloudIcon} .secondaryIcon=${extLinkIcon} disabled>Third Item (disabled)</lwdc-menu-item>												
					<lwdc-menu-item .icon=${userIcon}> Fourth Item (<b>with markup</b>)</lwdc-menu-item>
					<hr role="separator" />
					<lwdc-menu-item .icon=${userIcon}>Fifth Item (with divider)</lwdc-menu-item>
					
				</lwdc-menu>`;
}
menuStory.story = {
	name: 'Menu'
}

