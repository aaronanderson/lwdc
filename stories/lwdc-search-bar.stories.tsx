/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-search-bar';

loadWDCFonts();

export const searchBarStory = () => {
	return html`

			<div style="width: 500px;">
					<lwdc-search-bar height="48" placeHolder="Search" @lwdc-search-bar-query=${(e: CustomEvent)=> {console.log("Query submitted", e.detail && e.detail.query); (e.target as any).searchReset();}}></lwdc-search-bar>
			</div>


				`;
}

searchBarStory.storyName = 'Search Bar';
searchBarStory.parameters = { layout: 'centered' };
searchBarStory.component = 'lwdc-search-bar';
searchBarStory.decorators= [withKnobs];
