/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-table';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-table',
	decorators: [withKnobs, center]
};


const entries = [{ 'id': '1', 'name': 'Entry 1', 'description': 'Description 1' }, { 'id': '2', 'name': 'Entry 2', 'description': 'Description 2' }, { 'id': '3', 'name': 'Entry 3', 'description': 'Description 3' }];
export const tableStory = () => {
	return html`<lwdc-table .entries=${entries} style="width: 400px;">
						<lwdc-row key="id" header="ID"></lwdc-row>
						<lwdc-row key="name" header="Name"></lwdc-row>
						<lwdc-row key="description" header="Description"></lwdc-row>
					</lwdc-table>
				`;
}
tableStory.story = {
	name: 'Table'
}

