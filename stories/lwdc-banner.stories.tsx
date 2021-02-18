/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-banner';

import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';



loadWDCFonts();



export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-banner',
	decorators: [withKnobs]
};


const stickyBox = () => boolean("Sticky", false);
const errorBox = () => boolean("Error", false);


export const bannerStory = () => {
	return html`
				<lwdc-banner text="3 Entries" link="View All" ?sticky=${stickyBox()} ?error=${errorBox()} ></lwdc-banner>
				`;
}

bannerStory.storyName = 'Banner';
bannerStory.parameters = { layout: 'centered' };
