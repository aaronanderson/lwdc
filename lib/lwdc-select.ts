import { LitElement, html, css, customElement, property } from 'lit-element';
import FormFieldElement from './lwdc-form-field';
import { styleLightDOM } from './util';

import styleCSS from './lwdc-select.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-select')
export class SelectElement<T> extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	name?: string;

	@property({ type: String, attribute: true, reflect: true })
	valueId?: string;

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


	static formAssociated = true;

	//https://web.dev/more-capable-form-controls/#event-based-api
	//https://github.com/microsoft/TypeScript/issues/33218
	internals?: any;


	static get styles() {
		return [style];
	}

	firstUpdated() {
		styleLightDOM(this, style, 'lwdc-select');	
		if (!this.placeholder && this.options.length) {
			this.valueId = this.valueSelector(this.options[0]);
		}
		this.internals = (this as any).attachInternals();
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
		if (this.getRootNode()) {
			const rootNode = this.getRootNode() as any;
			rootNode.adoptedStyleSheets = !!rootNode.adoptedStyleSheets ? [...rootNode.adoptedStyleSheets, style.styleSheet] : [style.styleSheet];
		}
		super.connectedCallback();
	}

	render() {
		return html`<div class="wdc-form-select">
						<select formnovalidate autocomplete="on" @change=${this.handleChange}>
							${this.placeholder ? html`<option ?selected=${!this.valueId} disabled hidden style='display: none' value="">${this.placeholder}</option>` : undefined} 
			${this.options.map((e: T, i: number) => {
			let name = this.nameSelector(e);
			let value = this.valueSelector(e);
			let selected = value && (value === this.valueId);
			return html`<option ?selected=${selected} label="${name}">${value}</option>`;

		})}								
						</select>
					</div>
				`;
	}


	get value() {
		return this.options.find((e: T) => this.valueSelector(e) === this.valueId);
	}

	get formField() {
		return this.closest('lwdc-form-field') as FormFieldElement;
	}

	handleChange(e: Event) {
		this.valueId = (<HTMLSelectElement>e.target).value;
		this.checkValidity();
	}

	checkValidity() {
		if (!this.matches(':disabled') && (this.hasAttribute('required') && (this.valueId === undefined))) {
			this.internals.setValidity({ customError: true }, `${this.formField.label} is required`);
			this.formField.hintText = this.internals.validationMessage;
		} else {
			this.internals.setValidity({ customError: false });
			this.formField.hintText = undefined;
		}
		return this.internals.checkValidity();
	}

	formResetCallback() {
		this.valueId = undefined;
		this.internals.setValidity({ customError: false });
		this.formField.hintText = undefined;
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







