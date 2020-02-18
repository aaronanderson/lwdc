import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';

const style = css(<any>[require('./lwdc-form-field.scss').default]);


@customElement('lwdc-form-field')
export class FormFieldElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	label?: String;

	@property({ type: Number })
	labelPosition: FormFieldLabelPosition = FormFieldLabelPosition.Top;

	@property({ type: String, attribute: true, reflect: true })
	hintText?: String;


	@property({ type: Number })
	errorType: ErrorType = ErrorType.error;

	elementChildren: Array<Element> = [];

	//only used with shadow DOM
	static get styles() {
		return [style];
	}



	//disable shadow DOM so containing wdc-form class relative css can be applied
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		this.elementChildren = Array.from(this.children);
		super.connectedCallback();
	}

	render() {
		let fieldClass = {
			'wdc-form-field-wrapper': true,
			'wdc-form-field-error': (this.errorType == ErrorType.error) && !!this.hintText,
			'wdc-form-field-alert': (this.errorType == ErrorType.alert) && !!this.hintText
		};
		let formClass = {
			'wdc-form-field': true,
			'wdc-form-error': (this.errorType == ErrorType.error) && !!this.hintText,
			'wdc-form-alert': (this.errorType == ErrorType.alert) && !!this.hintText
		};


		return html`<div class="${classMap(fieldClass)}">
						<label class="wdc-form-label">
						${ifDefined(this.label)}
						${this.requiredTemplate}
						</label>
						<div class="${classMap(formClass)}">
							${this.elementChildren}
							${this.hintTemplate}
						</div>
					</div>
					`;
	}


	get hintTemplate() {
		if (this.hintText) {
			return html`<div class="wdc-form-hint-message">
				${this.errorType == ErrorType.error ? html`<strong>Error:</strong> ${this.hintText}` : html`<strong>Alert:</strong> ${this.hintText}`} 
			</div>`;
		}
	}

	get requiredTemplate() {
		let hasRequired = !!this.elementChildren.find((e: Element) => e.hasAttribute("required"));
		if (hasRequired) {
			return html`<abbr class="lwdc-required-astrisk">*</abbr>`;
		}
	}



}

export enum FormFieldLabelPosition {
	Top,
	Left,
	Hidden,
}

export enum ErrorType {
	alert,
	error
}

export default FormFieldElement;







