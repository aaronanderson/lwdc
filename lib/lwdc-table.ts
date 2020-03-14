import { LitElement, html, css, customElement, property, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import './lwdc-icon';
import './lwdc-modal';
import './lwdc-form';
import './lwdc-form-field';
import './lwdc-select';
import './lwdc-button';

import { filterIcon, sortIcon } from '@workday/canvas-system-icons-web';
import ModalElement from './lwdc-modal';
import { FormFieldLabelPosition } from './lwdc-form-field';
import { closestElement } from './util';

const style = css(<any>[require('./lwdc-table.scss').default]);


@customElement('lwdc-table')
export class TableElement<E> extends LitElement {

	@property({ type: String, attribute: true })
	name?: string;

	@property({ type: Boolean })
	editMode: boolean = false;

	@property({ type: Boolean })
	inlineEditMode: boolean = false;

	@property({ type: Object })
	additionalEditRenderer?: Function;

	//@property({ type: Object })
	//pendingChanges: Set<E> = new Set();

	_entries: E[] = [];

	_view: E[] = [];

	rows: TableRowElement[] = [];


	@property({ type: Array })
	public get entries(): E[] {
		return this._entries;
	}

	public set entries(value: E[]) {
		const oldValue = this._entries;
		this._entries = [...value];
		this.resetView();
		this.requestUpdate('entries', oldValue);
	}


	static get styles() {
		return [style];
	}

	constructor() {
		super();
		this.rows = Array.from(this.children) as TableRowElement[];
	}

	firstUpdated() {

	}

	render() {
		if (this.editMode) {
			return this.editEntriesTemplate;
		} else {
			return this.entriesTemplate;
		}
	}


	// <div class="wdc-icon-list-icon">
	// 						<i class="wdc-icon" data-icon="sort" data-category="system"></i>
	// 					</div>
	get entriesTemplate() {
		return html`
					${this.headerTemplate}

					<table class="wdc-table">
						<thead>
							<tr>
								${this.rows.map((r: TableRowElement) => html`<th scope="col" style="${this.cellWidth(r)}">${r.header}</th>`)}
							</tr>
						</thead>
						<tbody>
							${this._view.map((e: E) => this.entryRow(e))}               
						</tbody>
					</table>
	
			`
	}

	// <div class="wdc-icon-list-icon">
	// 						<i class="wdc-icon" data-icon="sort-up" data-category="system"></i>
	// 					</div>
	get editEntriesTemplate() {
		return html`						
				${this.headerTemplate}
				
				<table class="wdc-table">
					<thead>
						<tr>
							<th scope="col" style="width: 100px">
								<span @click="${(m: MouseEvent) => this.addEntry()}">	
									<i class="wdc-icon" data-icon="plus" data-category="system" data-size="20"></i>
								</span>	
							</th>
							${this.rows.map((r: TableRowElement) => html`<th scope="col" style="${this.cellWidth(r)}">${r.header}</th>`)} 
						</tr>
					</thead>
					<tbody>
						${this._view.map((e: E) => this.entryEditRow(e))}               
					</tbody>
				</table>
				
				${this.additionalEditRenderer ? this.additionalEditRenderer(this._view) : null}
			
			`


	}

	get headerTemplate() {
		return html`
							
					<lwdc-modal title="Sort" id="sort">		
						<lwdc-form .labelPosition=${FormFieldLabelPosition.Top}>
							<lwdc-form-field label="Row">
								<lwdc-select name="sortRow" required .options=${this.rowNames}></lwdc-select>								
							</lwdc-form-field>	
							<lwdc-form-field group="order" label="Order">

								<lwdc-radio  name="order" label="Ascending" checked></lwdc-radio>
								<lwdc-radio  name="order" label="Descending"></lwdc-radio>

							</lwdc-form-field>
							<lwdc-button  @click=${this.performSort}>Sort</lwdc-button>
						</<lwdc-form>
						
								
					</lwdc-modal>								
					<lwdc-modal title="Filter" id="filter">		
						<div style="margin-bottom: 24px;">
						</div>
						<lwdc-button  @click=${(e: Event) => { ((e.target as HTMLElement).closest("lwdc-modal") as any).close(); }}>Filter</lwdc-button>								
					</lwdc-modal>
					
					
					<div class="wdc-table-meta">
						<div class="wdc-table-info">
							<span class="wdc-table-name">${this.name}</span>
							<span class="wdc-table-row-count">${this._view.length} Items</span>
						</div>

						<div class="wdc-icon-list">
							
							<div class="wdc-icon-list-icon" role="button" tabIndex="0" @click=${this.handleSort.bind(this)}>
								<lwdc-icon .icon=${sortIcon}></lwdc-icon>
							</div>	
							<div class="wdc-icon-list-icon" role="button" tabIndex="0" @click=${this.handleFilter.bind(this)}>
								<lwdc-icon .icon=${filterIcon}></lwdc-icon>
							</div>
						</div>
					</div>	
		
		`;
	}

	get rowNames() {
		return this.rows.map((r: TableRowElement, i: number) => <any>{ 'id': i, 'name': r.header });
	}

	resetView() {
		this._view = Array.from(this._entries);
	}

	handleSort() {
		this.sortDialog!.open();
	}

	performSort(e: Event) {
		let form = closestElement('lwdc-form', (e.target as HTMLElement)) as any;
		let dialog = closestElement('lwdc-modal', (e.target as HTMLElement)) as any;
		if (form.validate()) {
			
			dialog.close();
		}

	}

	handleFilter() {
		this.filterDialog!.open();
	}

	performFilter(e: Event) {
		let form = closestElement('lwdc-form', (e.target as HTMLElement)) as any;
		let dialog = closestElement('lwdc-modal', (e.target as HTMLElement)) as any;
		if (form.validate()) {
			dialog.close();
		}

	}

	entryRow(e: E) {
		let body: TemplateResult[] = [];
		this.rows.forEach((row: TableRowElement) => {
			body.push(this.renderCell(e, row));
		});
		return html`<tr>${body}</tr>`;

	}

	entryEditRow(e: E) {
		let body: TemplateResult[] = [];
		body.push(html`
						<td>
							<div class="wdc-icon-list">
								${!this.inlineEditMode ? html`
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.editEntry(e)}">
										<i class="wdc-icon" data-icon="edit" data-category="system" data-size="20"></i>
									</span>
								</div>`: null}																
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.removeEntry(e)}">
										<i class="wdc-icon" data-icon="minus" data-category="system" data-size="20"></i>
									</span>
								</div>										
							</div>
						</td>
		`);
		this.rows.forEach((row: TableRowElement) => {
			if (this.inlineEditMode) {
				if (row.key) {
					let obj = e as any;
					let k: string = row.key;
					body.push(html`
						<td style="${this.cellWidth(row)}">
							<div class="wdc-form-textinput">
									<input type="text" class="wdc-form-textinput" .value="${obj.hasOwnProperty(k) ? obj[k] : null}" @change=${(c: Event) => { obj[k] = (<HTMLInputElement>c.target).value; this.fireEvent('edit', e); this.requestUpdate(); }}/>
							</div>
						</td>								
					`);
				} else if (row.renderer) {
					body.push(html`<td style="${this.cellWidth(row)}">${row.renderer(e)}</td>`);
				}
			} else {
				body.push(this.renderCell(e, row));
			}
		});
		return html`<tr>${body}</tr>`;

	}

	cellWidth(row: TableRowElement) {
		return ifDefined(row.width ? 'width: ' + row.width : undefined);
	}

	renderCell(e: E, row: TableRowElement): TemplateResult {
		if (row.key) {
			let obj = e as any;
			return html`<td style="${this.cellWidth(row)}">${obj[row.key]}</td>`;
		} else if (row.renderer) {
			return html`<td style="${this.cellWidth(row)}">${row.renderer(e)}</td>`;
		} else {
			return html``;
		}
	}

	fireEvent(type: string, e?: E) {
		this.dispatchEvent(new CustomEvent(`lwdc-table-${type}`, e ? {
			detail: {
				entry: e
			}
		} : undefined));
	}

	addEntry() {
		//console.log("addEntry");
		if (this.inlineEditMode) {
			let entry = <any>{};
			this.entries.push(entry);
			this.resetView();
			this.requestUpdate();
			this.fireEvent('add', entry);
		} else {
			this.fireEvent('add');
		}
	}

	editEntry(e: E) {
		//console.log("editEntry");
		this.fireEvent('edit', e);
	}


	removeEntry(e: E) {
		//console.log("removeEntry");
		if (this.inlineEditMode) {
			let index = this.entries.indexOf(e);
			if (index > -1) {
				this.entries.splice(index, 1);
			}
			this.resetView();
			this.requestUpdate();
		}

		this.fireEvent('remove', e);
	}


	get sortDialog() {
		return this.shadowRoot!.getElementById("sort") as ModalElement;
	}

	get filterDialog() {
		return this.shadowRoot!.getElementById("filter") as ModalElement;
	}




}


@customElement('lwdc-row')
export class TableRowElement extends LitElement {

	@property({ type: String, attribute: true })
	key?: string;

	@property({ type: String, attribute: true })
	header?: string;

	@property({ type: String, attribute: true })
	width?: string;

	@property({ type: Object })
	renderer?: Function;


}

export default { TableElement, TableRowElement };








