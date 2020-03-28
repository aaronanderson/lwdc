/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-table';
import '../lib/lwdc-text';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="width: 600px; margin: 64px 64px; ">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-table',
	decorators: [withKnobs, center]
};


const entries = [{ 'id': '1', 'name': 'Entry 1', 'description': 'Description 1' }, { 'id': '2', 'name': 'Entry 2', 'description': 'Description 2' }, { 'id': '3', 'name': 'Entry 3', 'description': 'Description 3' }];
export const tableStory = () => {
	return html`	<div>
						<h3>View</h3>
						<lwdc-table select .entries=${entries}>
							<lwdc-table-col key="id" header="ID"></lwdc-table-col>
							<lwdc-table-col key="name" header="Name"></lwdc-table-col>
							<lwdc-table-col key="description" header="Description"></lwdc-table-col>
						</lwdc-table>
					</div>
					<div>
						<h3>Edit</h3>
						<lwdc-table edit .entries=${entries} @lwdc-table-add=${add} @lwdc-table-edit=${edit} @lwdc-table-remove=${remove}}>
							<lwdc-table-col key="id" header="ID"></lwdc-table-col>
							<lwdc-table-col key="name" header="Name"></lwdc-table-col>
							<lwdc-table-col key="description" header="Description"></lwdc-table-col>
						</lwdc-table>
					</div>
					<div>
						<h3>Inline Edit</h3>
						<lwdc-table edit inline .entries=${entries} @lwdc-table-add=${add} @lwdc-table-edit=${edit} @lwdc-table-remove=${remove}} .additionalEditRenderer=${dataList.bind(this)}>
							<lwdc-table-col key="id" header="ID"></lwdc-table-col>
							<lwdc-table-col key="name" .renderer=${nameRenderer} header="Name"></lwdc-table-col>
							<lwdc-table-col key="description" header="Description"></lwdc-table-col>
						</lwdc-table>
					</div>	
				`;
}
tableStory.story = {
	name: 'Table'
}

const add = (e: CustomEvent) => {
	console.log('add');
}

const edit = (e: CustomEvent) => {
	console.log('edit', e.detail.entry)
}

const remove = (e: CustomEvent) => {
	console.log('remove', e.detail.entry)
}

const nameRenderer = (e: any) => {
	return html`
					`;
}

const dataList = () => {
	return html`
					<datalist id="names">	
						<option label="Entry 1" >Entry 1</option>
						<option label="Entry 2" >Entry 2</option>
						<option label="Entry 2" >Entry 3</option>
					</datalist>`;
}


