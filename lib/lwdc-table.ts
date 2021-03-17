import { LitElement, html, css, customElement, property, query, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import {cache} from 'lit-html/directives/cache.js';

import './lwdc-icon';
import './lwdc-modal';
import './lwdc-form';
import './lwdc-form-field';
import './lwdc-select';
import './lwdc-button';
import './lwdc-radio';
import './lwdc-text';

import { filterIcon, sortIcon, plusIcon, editIcon, minusIcon, arrowUpIcon, arrowDownIcon, caretBottomSmallIcon, caretTopSmallIcon, caretDownSmallIcon, caretUpSmallIcon } from '@workday/canvas-system-icons-web';
import ModalElement from './lwdc-modal';
import { FormElement } from './lwdc-form';
import { FormFieldLabelPosition } from './lwdc-form-field';
import { closestElement, pathValue } from './util';

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

	@property({ type: Boolean, attribute: 'move', reflect: true })
	editMoveMode: boolean = false;

	@property({ type: Boolean, attribute: 'select', reflect: true })
	selectMode: boolean = false;

	@property({ type: String, attribute: true })
	rowErrorKey: string = 'rowErrorType';

	@property({ type: Object })
	additionalEditRenderer?: Function;

	@query("#edit-form")
	editForm?: FormElement;

	rowErrorCache = new WeakMap();


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
			const col = this.cols.filter((col: TableColumnElement)=> !col.hidden).find((r: TableColumnElement) => r.key === filterEntry.key);
			if (col && col.key) {
				let k: string = col.key;
				let val = filterEntry.value.toLocaleLowerCase();
				viewEntries = viewEntries.filter((e: any) => {
					let valQ = pathValue(e,k);
					let valE: string = valQ ? valQ.toLocaleLowerCase() : '';
					if (filterEntry.by === 'Contains') {
						return valE.includes(val);
					} else if (filterEntry.by === 'Begins-With') {
						return valE.startsWith(val);
					} else if (filterEntry.by === 'Ends-With') {
						return valE.endsWith(val);
					} else if (filterEntry.by === 'RegExp') {
						//console.log(new RegExp(val, 'g').test(valE));
						return new RegExp(val, 'g').test(valE);
					}
					return false;

				});
			}
		}

		for (let sortEntry of this.sort) {
			const col = this.cols.filter((col: TableColumnElement)=> !col.hidden).find((r: TableColumnElement) => r.key === sortEntry.key);
			if (col && col.key) {
				let k: string = col.key;
				viewEntries.sort((a: any, b: any) => {
					let valQ = pathValue(a,k);
					let valA = valQ ? valQ : '';
					valQ = pathValue(b,k);
					let valB = valQ ? valQ : '';
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

	async connectedCallback() {
	  this.cols = Array.from(this.children) as TableColumnElement[];
		super.connectedCallback();
  	//await this.updateComplete;
  }

	render() {
		return html `${cache(this.editMode ? this.editEntriesTemplate : this.entriesTemplate)}`;
		// if (this.editMode) {
		// 	return this.editEntriesTemplate;
		// } else {
		// 	return this.entriesTemplate;
		// }
	}

	get entriesTemplate() {
		return html`
					${this.headerTemplate}

					<table class="wdc-table">
						<thead>
							<tr>
								${this.cols.filter((col: TableColumnElement)=> !col.hidden).map((r: TableColumnElement) => this.renderHeader(r))}
							</tr>
						</thead>
						<tbody>
							${this.view.map((e: E) => this.entryRow(e))}
						</tbody>
					</table>

			`
	}

	get editEntriesTemplate() {
		const tableTemplate = html `
		<table class="wdc-table">
			<thead>
				<tr>
					<th scope="col" style="width: 100px">
						<span @click="${(m: MouseEvent) => this.addEntry()}">
							<lwdc-icon .icon=${plusIcon}></lwdc-icon>
						</span>
					</th>
					${this.editMoveMode? html `
						<th scope="col" style="width: 100px">Order</th>
						`: undefined}
					${this.cols.filter((col: TableColumnElement)=> !col.hidden).map((r: TableColumnElement) => this.renderHeader(r))}
				</tr>
			</thead>
			<tbody>
				${this.view.map((e: E, i: number, a: Array<E>) => this.entryEditRow(e, i, a))}
			</tbody>
		</table>

		${this.additionalEditRenderer ? this.additionalEditRenderer(this.view) : undefined}

		`;

		return html`
				${this.headerTemplate}
				${this.inlineEditMode? html `<lwdc-form id="edit-form" @lwdc-form-element-validity=${(c: CustomEvent)=> this.checkEditFormValidity(c)} >${tableTemplate}</lwdc-form>`: tableTemplate}
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
								<lwdc-radio label="Ascending" checked value="Ascending"></lwdc-radio>
								<lwdc-radio label="Descending" value="Descending"></lwdc-radio>
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
								<lwdc-radio label="Contains" checked value="Contains"></lwdc-radio>
								<lwdc-radio label="Begins-With" value="Begins-With"></lwdc-radio>
								<lwdc-radio label="Ends-With" value="Ends-With"></lwdc-radio>
								<lwdc-radio label="RegExp" value="RegExp"></lwdc-radio>
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


	renderCell(e: E, i: number, col: TableColumnElement): TemplateResult {
		let contents = undefined;
		if (col.renderer) {
			contents = html`${col.renderer(e, i)}`;
		} else if (col.key) {
			let obj = e as any;
			contents = html`${obj[col.key]}</td>`;
		}
		return html`<td style="${this.cellWidth(col)}">${contents}</td>`;
	}


	get rowNames() {
		return this.cols.filter((r: TableColumnElement) => !r.hidden && r.key).map((r: TableColumnElement) => <any>{ 'key': r.key, 'name': r.header });
	}



	sortAdd(e: Event) {
		let form = closestElement('lwdc-form', (e.target as HTMLElement)) as any;
		//let dialog = closestElement('lwdc-modal', (e.target as HTMLElement)) as any;
		if (form.validate()) {
			const col = this.cols.filter((col: TableColumnElement)=> !col.hidden).find((r: TableColumnElement) => r.key === form.item("sortColumn").value);
			if (col && ![...this.sort].find((e: SortEntry) => e.key === col.key)) {
				this.sort.add(<SortEntry>{
					key: col.key,
					header: col.header,
					direction: form.radioValue("order")
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
			const col = this.cols.filter((col: TableColumnElement)=> !col.hidden).find((r: TableColumnElement) => r.key === form.item("filterColumn").value);
			if (col && ![...this.filter].find((e: FilterEntry) => e.key === col.key)) {
				this.filter.add(<FilterEntry>{
					key: col.key,
					header: col.header,
					by: form.radioValue("by"),
					value: form.item("value")!.value
				});
				this.requestUpdate();
				//dialog.close();
			}
		}
	}

	entryRow(e: E) {
		let body: TemplateResult[] = [];
	  let rowErrorType = (e as any)[this.rowErrorKey] as RowErrorType;
		this.cols.filter((col: TableColumnElement)=> !col.hidden).forEach((col: TableColumnElement, i: number) => {
			body.push(this.renderCell(e, i, col));
		});
		if (this.selectMode) {
			return html`<tr class=${this.rowErrorClass(rowErrorType)} @click=${(m: MouseEvent) => this.entryClick(e, m.currentTarget as HTMLTableRowElement)}>${body}</tr>`;
		} else {
			return html`<tr class=${this.rowErrorClass(rowErrorType)}>${body}</tr>`;
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

	entryEditRow(e: E, i: number, a: Array<E>) {
		let body: TemplateResult[] = [];
		let rowErrorType = (e as any)[this.rowErrorKey] as RowErrorType;
		body.push(html`
						<td>
							<div class="wdc-icon-list">
								${!this.inlineEditMode ? html`
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.editEntry(e)}">
										<lwdc-icon .icon=${editIcon}></lwdc-icon>
									</span>
								</div>`: undefined}
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.removeEntry(e)}">
										<lwdc-icon .icon=${minusIcon}></lwdc-icon>
									</span>
								</div>
							</div>
						</td>
						${this.editMoveMode ? html`
						<td>
							<div class="wdc-icon-list">
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.moveEntry(e, 'up')}">
										<lwdc-icon .icon=${ i == 0? caretBottomSmallIcon: caretUpSmallIcon}></lwdc-icon>
									</span>
								</div>
								<div class="wdc-icon-list-icon">
									<span @click="${(m: MouseEvent) => this.moveEntry(e, 'down')}">
										<lwdc-icon .icon=${ i== a.length -1 ? caretTopSmallIcon: caretDownSmallIcon}></lwdc-icon>
									</span>
								</div>
							</div class="wdc-icon-list">
						</td>`: undefined}
		`);
		this.cols.filter((col: TableColumnElement)=> !col.hidden).forEach((col: TableColumnElement) => {
			if (this.inlineEditMode) {
				if (col.renderer) {
					body.push(html`<td style="${this.cellWidth(col)}">${col.renderer(e, i)}</td>`);
				} else if (col.key) {
					let obj = e as any;
					let k: string = col.key;
					body.push(html`
						<td style="${this.cellWidth(col)}">
							<lwdc-form-field label=${col.header} .showLabel=${undefined}>
								<lwdc-text ?required=${ifDefined(col.required)} .value="${obj.hasOwnProperty(k) ? obj[k] : undefined}"  @change=${(c: Event) => { obj[k] = (<HTMLInputElement>c.target).value; this.fireEvent('edit', e); this.requestUpdate(); }}></lwdc-text>
							</lwdc-form-field>
						</td>
					`);
				} else {
					return html``;
				}
			} else {
				body.push(this.renderCell(e, i, col));
			}
		});
		return html`<tr class=${this.rowErrorClass(rowErrorType)}>${body}</tr>`;

	}

	cellWidth(col: TableColumnElement) {
		return ifDefined(col.width ? 'width: ' + col.width : undefined);
	}

	rowErrorClass(rowErrorType?: RowErrorType){
		let errorClass = {} as any;
		if (rowErrorType == RowErrorType.error){
			errorClass['wdc-table-row-error'] = true;
		} else if (rowErrorType == RowErrorType.alert){
			errorClass['wdc-table-row-alert'] = true;
		} else if (rowErrorType == RowErrorType.error_boarderless){
			errorClass['wdc-table-row-error-borderless'] = true;
		} else if (rowErrorType == RowErrorType.alert_borderless){
			errorClass['wdc-table-row-alert-borderless'] = true;
		}
		return classMap(errorClass);
	}

	checkEditFormValidity(c: CustomEvent){ //

		if (this.editForm && c.target){
			let tr = (c.target as HTMLElement).closest("tr");
			if (tr){
				let rowErrors = this.rowErrorCache.get(tr);
				if (!rowErrors){
					rowErrors = new Set();
					this.rowErrorCache.set(tr, rowErrors);
				}

				if (!c.detail.validity){
					rowErrors.add(c.target);
				}else {
					rowErrors.delete(c.target);
				}
				if (rowErrors.size > 0){
					tr.classList.add('wdc-table-row-error');
				}else {
					this.rowErrorCache.delete(tr);
					tr.classList.remove('wdc-table-row-error');
				}
				this.requestUpdate();
			}
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
			//await this.updateComplete;//wait for form elements to sync for validation purposes.
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
				this.resetView();
				this.requestUpdate();
			}
		}

		this.fireEvent('remove', e);
	}

	moveEntry(e: E, d: string) {
		//console.log("moveEntry", d);
		let index = this.entries.indexOf(e);
		if (index > -1) {
			let len = this.entries.length;
			this.entries.splice(index, 1);
			if (index == 0 && 'up' == d){
				this.entries.push(e);
			} else if (index == len -1 && 'down' == d){
				this.entries.unshift(e);
			} else {
				let dir = 'up' == d ?  -1 : 1;
				this.entries.splice(index + dir, 0, e);
			}
			this.resetView();
			this.requestUpdate();
		}
		this.fireEvent(`move-${d}`, e);
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

export enum RowErrorType {
	alert,
	alert_borderless,
	error,
	error_boarderless
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

	@property({ type: Boolean, attribute: true })
	hidden: boolean = false;

	@property({ type: Object })
	renderer?: Function;


}

export default { TableElement, TableColumnElement };
