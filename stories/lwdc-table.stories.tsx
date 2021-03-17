/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { closestElement } from '../lib/util';
import '../lib/lwdc-table';
import '../lib/lwdc-text';
import '../lib/lwdc-action-bar';
import '../lib/lwdc-button';
import { TableElement, RowErrorType } from '../lib/lwdc-table';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-table',
	decorators: [withKnobs]
};

const hideColumnBox = () => boolean("Hide Column", false);

const entries = [{ 'id': '1', 'name': 'Entry 1', 'description': 'Description 1' }, { 'id': '2', 'name': 'Entry 2', 'description': 'Description 2' }, { 'id': '3', 'name': 'Entry 3', 'description': 'Description 3' }];
const errorEntries = Array(7).fill().map((_, i) => {
	let errorType = undefined;
	let errorTypeDesc = 'None';
	if (i==0){
		errorType = RowErrorType.alert;
	  errorTypeDesc = 'Alert';
	} else if (i==2){
		errorType = RowErrorType.alert_borderless;
	  errorTypeDesc = 'Alert Boarderless';
	} else if (i==4){
		errorType = RowErrorType.error;
	  errorTypeDesc = 'Error';
	} else if (i==6){
		errorType = RowErrorType.error_boarderless;
		errorTypeDesc = 'Error Boarderless';
	}
	return Object.assign({}, {'id': `${i + 1}`, 'name': `Entry ${i + 1}`, 'errorType': errorTypeDesc, 'rowErrorType': errorType});
});

export const tableStory = () => {

	return html`
					<div>
						<h3>View</h3>
						<lwdc-table select name="View" .entries=${entries}>
							<lwdc-table-col key="id" header="ID" .hidden=${hideColumnBox()}></lwdc-table-col>
							<lwdc-table-col key="name" header="Name"></lwdc-table-col>
							<lwdc-table-col key="description" header="Description"></lwdc-table-col>
						</lwdc-table>
					</div>

					<div>
						<h3>Errors</h3>
						<lwdc-table select name="View" .entries=${errorEntries}>
							<lwdc-table-col key="id" header="ID"></lwdc-table-col>
							<lwdc-table-col key="name" header="Name"></lwdc-table-col>
							<lwdc-table-col key="errorType" header="Error Type"></lwdc-table-col>
						</lwdc-table>
					</div>

					<div>
						<h3>Edit</h3>
						<lwdc-table edit move .entries=${entries} @lwdc-table-add=${add} @lwdc-table-edit=${edit} @lwdc-table-remove=${remove}}>
							<lwdc-table-col key="id" header="ID"></lwdc-table-col>
							<lwdc-table-col key="name" header="Name"></lwdc-table-col>
							<lwdc-table-col key="description" header="Description"></lwdc-table-col>
						</lwdc-table>
					</div>
					<div>
						<h3>Inline Edit</h3>
						<lwdc-table edit inline move .entries=${entries} @lwdc-table-add=${add} @lwdc-table-edit=${edit} @lwdc-table-remove=${remove}} .additionalEditRenderer=${dataList.bind(this)} id="inline-edit">
							<lwdc-table-col key="id" header="ID" ?required=${true}></lwdc-table-col>
							<lwdc-table-col key="name" .renderer=${nameRenderer} header="Name"></lwdc-table-col>
							<lwdc-table-col key="description" header="Description"></lwdc-table-col>
						</lwdc-table>
					</div>
					<lwdc-action-bar>
						<lwdc-button @click="${handleValidate}">Validate</lwdc-button>
					</lwdc-action-bar>
				`;
}

tableStory.storyName = 'Table';
tableStory.parameters = { layout: 'centered' };

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
		<lwdc-form-field label="Name" .showLabel=${undefined}>
			<lwdc-text required .value="${e.name}" @change=${(c: Event) => { let t = (c.target as any); let table = closestElement('lwdc-table', t) as TableElement<any>; e.name = t.value; table.fireEvent('edit', e); table.requestUpdate(); }} list="names"></lwdc-text>
		</lwdc-form-field>
	`;
}

const handleValidate = (e: MouseEvent) => {
  const editTable = document.querySelector("#inline-edit");
	const validationResult = editTable.editForm.validate();
	console.log('validate', validationResult);
}

const dataList = () => {
	return html`
					<datalist id="names">
						<option label="First" >Entry 1</option>
						<option>Entry 2</option>
						<option label="Final" >Entry 3</option>
					</datalist>`;
}
