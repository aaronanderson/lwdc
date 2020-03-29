import { LitElement, html, css, customElement, property, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import './lwdc-icon';
import './lwdc-modal';
import './lwdc-form';
import './lwdc-form-field';
import './lwdc-select';
import './lwdc-button';
import './lwdc-radio';
import './lwdc-text';

import { filterIcon, sortIcon, plusIcon, editIcon, minusIcon, arrowUpIcon, arrowDownIcon } from '@workday/canvas-system-icons-web';
import ModalElement from './lwdc-modal';
import { FormFieldLabelPosition } from './lwdc-form-field';
import { closestElement } from './util';

import styleCSS from './lwdc-table.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-table')
export class TableElement<E> extends LitElement {

	@property({ type: String, attribute: true })
	name?: string;

	@property({ type: Boolean, attribute: 'edit', reflect: true })
	editMode: boolean = false;

	@property({ type: Boolean, attribute: 'inline', reflect: true })
	inlineEditMode: boolean = false;

	@property({ type: Boolean, attribute: 'select', reflect: true })
	selectMode: boolean = false;


	@property({ type: Object })
	additionalEditRenderer?: Function;

	//@property({ type: Object })
	//pendingChanges: Set<E> = new Set();

	_entries: E[] = [];

	selections: Set<E> = new Set();

	cols: TableColumnElement[] = [];

	sort: Set<SortEntry> = new Set();

	filter: Set<FilterEntry> = new Set();


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

	@property({ type: Array })
	public get view(): E[] {
		let viewEntries = Array.from(this._entries);

		for (let filterEntry of this.filter) {
			const col = this.cols.find((r: TableColumnElement) => r.key === filterEntry.key);
			if (col && col.key) {
				let k: string = col.key;
				let val = filterEntry.value.toLocaleLowerCase();
				viewEntries = viewEntries.filter((e: any) => {
					let valE = e[k] ? e[k].toLocaleLowerCase() : '';
					if (filterEntry.by === 'Contains') {
						return valE.includes(val);
					} else if (filterEntry.by === 'Begins-With') {
						return valE.startWith(val);
					} else if (filterEntry.by === 'Ends-With') {
						return valE.endsWith(val);
					} else if (filterEntry.by === 'RegExp') {
						console.log(new RegExp(val, 'g').test(valE));
						return new RegExp(val, 'g').test(valE);
					}
					return false;

				});
			}
		}

		for (let sortEntry of this.sort) {
			const col = this.cols.find((r: TableColumnElement) => r.key === sortEntry.key);
			if (col && col.key) {
				let k: string = col.key;
				viewEntries.sort((a: any, b: any) => {
					let valA = a[k] ? a[k] : '';
					let valB = b[k] ? b[k] : '';
					if (sortEntry.direction === 'Ascending') {
						return valA.localeCompare(valB, undefined, { numeric: true });
					} else {
						return valB.localeCompare(valA, undefined, { numeric: true });
					}

				});
			}
		}
		return viewEntries;
	}

	resetView() {
		this.selections.clear();
	}


	static get styles() {
		return [style];
	}

	constructor() {
		super();
		this.cols = Array.from(this.children) as TableColumnElement[];
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

	get entriesTemplate() {
		return html`
					${this.headerTemplate}

					<table class="wdc-table">
						<thead>
							<tr>
								${this.cols.map((r: TableColumnElement) => this.renderHeader(r))}
							</tr>
						</thead>
						<tbody>
							${this.view.map((e: E) => this.entryRow(e))}               
						</tbody>
					</table>
	
			`
	}

	get editEntriesTemplate() {
		return html`						
				${this.headerTemplate}
				
				<table class="wdc-table">
					<thead>
						<tr>
							<th scope="col" style="width: 100px">
								<span @click="${(m: MouseEvent) => this.addEntry()}">	
									<lwdc-icon .icon=${plusIcon}></lwdc-icon>
								</span>	
							</th>
							${this.cols.map((r: TableColumnElement) => this.renderHeader(r))} 
						</tr>
					</thead>
					<tbody>
						${this.view.map((e: E) => this.entryEditRow(e))}               
					</tbody>
				</table>
				
				${this.additionalEditRenderer ? this.additionalEditRenderer(this.view) : null}
			
			`


	}

	get headerTemplate() {
		return html`
							
					<lwdc-modal title="Sort" id="sort">		
						<lwdc-form .labelPosition=${FormFieldLabelPosition.Top}>
							<lwdc-form-field label="Column">
								<lwdc-select name="sortColumn" placeholder required .options=${this.rowNames} .valueSelector=${(r: any) => r.key} ></lwdc-select>								
							</lwdc-form-field>	
							<lwdc-form-field group="order" label="Order">
								<lwdc-radio  name="order" label="Ascending" checked value="Ascending"></lwdc-radio>
								<lwdc-radio  name="order" label="Descending" value="Descending"></lwdc-radio>
							</lwdc-form-field>
							<table class="lwdc-table-entries">							
								${[...this.sort].map((e: SortEntry) => html`
									<tr>
										<td @click="${(m: MouseEvent) => { this.sort.delete(e); this.requestUpdate(); }}"><lwdc-icon .icon=${minusIcon}></lwdc-icon></td>
										<td>${e.header}</td>
										<td>${e.direction}</td>
									</tr>	
								`)}
							</table>

							<lwdc-button  @click=${this.sortAdd}>Add</lwdc-button>
						</<lwdc-form>
					</lwdc-modal>


					<lwdc-modal title="Filter" id="filter">		
						<lwdc-form .labelPosition=${FormFieldLabelPosition.Top}>
							<lwdc-form-field label="Column">
								<lwdc-select name="filterColumn" placeholder required .options=${this.rowNames} .valueSelector=${(r: any) => r.key} ></lwdc-select>								
							</lwdc-form-field>	
							<lwdc-form-field group="by" label="By">
								<lwdc-radio  name="by" label="Contains" checked value="Contains"></lwdc-radio>
								<lwdc-radio  name="by" label="Begins-With" value="Begins-With"></lwdc-radio>
								<lwdc-radio  name="by" label="Ends-With" value="Ends-With"></lwdc-radio>
								<lwdc-radio  name="by" label="RegExp" value="RegExp"></lwdc-radio>
							</lwdc-form-field>
							<lwdc-form-field label="Value">
								<lwdc-text name="value" required></lwdc-text>
							</lwdc-form-field>
							<table class="lwdc-table-entries">							
								${[...this.filter].map((e: FilterEntry) => html`
									<tr>
										<td @click="${(m: MouseEvent) => { this.filter.delete(e); this.requestUpdate(); }}"><lwdc-icon .icon=${minusIcon}></lwdc-icon></td>
										<td>${e.header}</td>
										<td>${e.by}</td>
										<td>${e.value}</td>
									</tr>	
								`)}
							</table>

							<lwdc-button  @click=${this.filterAdd}>Add</lwdc-button>
						</<lwdc-form>
					</lwdc-modal>
					
					<div class="wdc-table-meta">
						<div class="wdc-table-info">
							<span class="wdc-table-name">${this.name}</span>
							<span class="wdc-table-row-count">${this.view.length} Items</span>
						</div>
						
						<div class="wdc-icon-list">
							
							<div class="wdc-icon-list-icon" role="button" tabIndex="0" @click=${() => this.sortDialog!.open()}>
								<lwdc-icon .icon=${sortIcon}></lwdc-icon>
							</div>	
							<div class="wdc-icon-list-icon" role="button" tabIndex="0" @click=${() => this.filterDialog!.open()}>
								<lwdc-icon .icon=${filterIcon}></lwdc-icon>
							</div>
						</div>
					</div>	
		
		`;
	}

	renderHeader(r: TableColumnElement): TemplateResult {
		let contents = html`${r.header}`;
		for (let sortEntry of this.sort) {
			if (sortEntry.key === r.key) {
				let icon = sortEntry.direction === 'Ascending' ? arrowDownIcon : arrowUpIcon;
				contents = html`${contents}<lwdc-icon .icon=${icon} .color=${'blueberry500'} .size=${16} ></lwdc-icon>`;
			}
		}
		for (let filterEntry of this.filter) {
			if (filterEntry.key === r.key) {
				contents = html`${contents}<lwdc-icon .icon=${filterIcon} .color=${'blueberry500'} .size=${16} ></lwdc-icon>`;
			}
		}
		return html`<th scope="col" style="${this.cellWidth(r)}">${contents}</th>`;
	}


	renderCell(e: E, row: TableColumnElement): TemplateResult {
		let contents = undefined;
		if (row.renderer) {
			contents = html`${row.renderer(e)}`;
		} else if (row.key) {
			let obj = e as any;
			contents = html`${obj[row.key]}</td>`;
		}
		return html`<td style="${this.cellWidth(row)}">${contents}</td>`;
	}


	get rowNames() {
		return this.cols.filter((r: TableColumnElement) => r.key).map((r: TableColumnElement) => <any>{ 'key': r.key, 'name': r.header });
	}



	sortAdd(e: Event) {
		let form = closestElement('lwdc-form', (e.target as HTMLElement)) as any;
		//let dialog = closestElement('lwdc-modal', (e.target as HTMLElement)) as any;
		if (form.validate()) {
			const col = this.cols.find((r: TableColumnElement) => r.key === form.item("sortColumn").valueId);
			if (col && ![...this.sort].find((e: SortEntry) => e.key === col.key)) {
				this.sort.add(<SortEntry>{
					key: col.key,
					header: col.header,
					direction: form.item("order")!.value
				});
				this.requestUpdate();
				//dialog.close();
			}
		}
	}

	filterAdd(e: Event) {
		let form = closestElement('lwdc-form', (e.target as HTMLElement)) as any;
		//let dialog = closestElement('lwdc-modal', (e.target as HTMLElement)) as any;
		if (form.validate()) {
			const col = this.cols.find((r: TableColumnElement) => r.key === form.item("filterColumn").valueId);
			if (col && ![...this.filter].find((e: FilterEntry) => e.key === col.key)) {
				this.filter.add(<FilterEntry>{
					key: col.key,
					header: col.header,
					by: form.item("by")!.value,
					value: form.item("value")!.value
				});
				this.requestUpdate();
				//dialog.close();
			}
		}
	}

	entryRow(e: E) {
		let body: TemplateResult[] = [];
		this.cols.forEach((row: TableColumnElement) => {
			body.push(this.renderCell(e, row));
		});
		if (this.selectMode) {
			return html`<tr @click=${(m: MouseEvent) => this.entryClick(e, m.currentTarget as HTMLTableRowElement)}>${body}</tr>`;
		} else {
			return html`<tr>${body}</tr>`;
		}

	}

	entryClick(e: E, r: HTMLTableRowElement) {
		if (this.selections.has(e)) {
			this.selections.delete(e);
			r.classList.remove('wdc-table-row-selected');
		} else {
			this.selections.add(e);
			r.classList.add('wdc-table-row-selected');
		}
	}

	entryEditRow(e: E) {
		let body: TemplateResult[] = [];
		body.push(html`
						<td>
							<div class="wdc-icon-list">
								${!this.inlineEditMode ? html`
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.editEntry(e)}">
										<lwdc-icon .icon=${editIcon}></lwdc-icon>
									</span>
								</div>`: null}																
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.removeEntry(e)}">
										<lwdc-icon .icon=${minusIcon}></lwdc-icon>
									</span>
								</div>										
							</div>
						</td>
		`);
		this.cols.forEach((row: TableColumnElement) => {
			if (this.inlineEditMode) {
				if (row.renderer) {
					body.push(html`<td style="${this.cellWidth(row)}">${row.renderer(e)}</td>`);
				} else if (row.key) {
					let obj = e as any;
					let k: string = row.key;
					body.push(html`
						<td style="${this.cellWidth(row)}">
							<lwdc-form-field label=${row.header} .showLabel=${undefined}>
								<lwdc-text ?required=${ifDefined(row.required)} .value="${obj.hasOwnProperty(k) ? obj[k] : null}" @change=${(c: Event) => { obj[k] = (<HTMLInputElement>c.target).value; this.fireEvent('edit', e); this.requestUpdate(); }}></lwdc-text>
							</lwdc-form-field>		
						</td>								
					`);
				} else {
					return html``;
				}
			} else {
				body.push(this.renderCell(e, row));
			}
		});
		return html`<tr>${body}</tr>`;

	}

	cellWidth(row: TableColumnElement) {
		return ifDefined(row.width ? 'width: ' + row.width : undefined);
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

interface SortEntry {
	header: string;
	key: string;
	direction: string;
}

interface FilterEntry {
	header: string;
	key: string;
	by: string;
	value: string;
}


@customElement('lwdc-table-col')
export class TableColumnElement extends LitElement {

	@property({ type: String, attribute: true })
	key?: string;

	@property({ type: String, attribute: true })
	header?: string;

	@property({ type: String, attribute: true })
	width?: string;

	@property({ type: Boolean, attribute: true })
	required: boolean = false;

	@property({ type: Object })
	renderer?: Function;


}

export default { TableElement, TableColumnElement };








