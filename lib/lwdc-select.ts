import { LitElement, html, css, customElement, property } from 'lit-element';
import { styleLightDOM, formElement } from './util';

import styleCSS from './lwdc-select.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-select')
export class SelectElement<T> extends formElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	value?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: string = ' ';

	@property({ type: Object })
	nameSelector: SelectNameSelector<T> = defaultNameSelector;

	@property({ type: Object })
	valueSelector: SelectValueSelector<T> = defaultValueSelector;

	@property({ type: Array })
	options: Array<T> = [];




	static get styles() {
		return [style];
	}

	firstUpdated() {
		styleLightDOM(this, style, 'lwdc-select');
		if (!this.placeholder && this.options.length) {
			this.value = this.valueSelector(this.options[0]);
		}

		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}

	//disable shadow DOM so containing wdc-form class relative css can be applied.
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`<div class="wdc-form-select">
						<select formnovalidate ?disabled=${this.disabled} autocomplete="on" @change=${this.handleChange}>
							${this.placeholder ? html`<option ?selected=${!this.value} disabled hidden style='display: none' value="">${this.placeholder}</option>` : undefined}
			${this.options.map((e: T, i: number) => {
			let name = this.nameSelector(e);
			let value = this.valueSelector(e);
			let selected = value && (value === this.value);
			return html`<option ?selected=${selected} label="${name}">${value}</option>`;

		})}
						</select>
					</div>
				`;
	}


	get selected() {
		return this.options.find((e: T) => this.valueSelector(e) === this.value);
	}


	handleChange(e: Event) {
		this.value = (<HTMLSelectElement>e.target).value;
		this.dispatchEvent(new CustomEvent(`lwdc-select-change`, e ? {
			detail: {
				entry: this.value
			}
		} : undefined));
		this.checkValidity();
	}

}


const defaultNameSelector = function (value: any) {
	return value.name;
}

const defaultValueSelector = function (value: any) {
	return value.id;
}

export interface SelectNameSelector<T> {
	(value: T): string;
};

export interface SelectValueSelector<T> {
	(value: T): string;
};

export default SelectElement;
