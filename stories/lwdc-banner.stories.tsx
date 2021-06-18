/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-banner';

import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';



loadWDCFonts();


const stickyBox = () => boolean("Sticky", false);
const errorBox = () => boolean("Error", false);


export const bannerStory = () => {
	return html`
				<lwdc-banner link="View All" ?sticky=${stickyBox()} ?error=${errorBox()} >3 <b>Entries</b></lwdc-banner>
				`;
}

bannerStory.storyName = 'Banner';
bannerStory.parameters = { layout: 'centered' };
bannerStory.component = 'lwdc-banner';
bannerStory.decorators= [withKnobs];
