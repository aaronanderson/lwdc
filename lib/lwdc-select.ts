import { LitElement, html, css, customElement, property } from 'lit-element';
import FormFieldElement from './lwdc-form-field';

const style = css(<any>[require('./lwdc-select.scss').default]);


@customElement('lwdc-select')
export class SelectElement<T> extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	name?: String;

	@property({ type: String, attribute: true, reflect: true })
	valueId?: String;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: String;

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

	static loadStyles() {
		//Custom fonts cannot be loaded in the ShadowDOM 
		//https://blog.webf.zone/on-styling-web-components-b74b8c70c492
		if (!document.head.querySelector('#lwdc-select')) {
			const fontStyleNode = document.createElement('style');
			fontStyleNode.id = "lwdc-select";
			fontStyleNode.innerHTML = style.cssText;
			document.head.appendChild(fontStyleNode);
		}

	}


	firstUpdated() {
		this.internals = (this as any).attachInternals();
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
		SelectElement.loadStyles();
	}

	//disable shadow DOM so containing wdc-form class relative css can be applied.	
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		if (this.getRootNode()) {
			const rootNode = this.getRootNode() as any;
			rootNode.adoptedStyleSheets = !!rootNode.adoptedStyleSheets ? [...rootNode.adoptedStyleSheets, style.styleSheet] : [style.styleSheet];
		}
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
							<option ?selected=${!this.valueId} disabled hidden style='display: none' value=""></option>
			${this.options.map((e: T) => {
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
		if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.valueId))) {
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







