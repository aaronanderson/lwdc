import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import FormFieldElement from './lwdc-form-field';
import { styleLightDOM } from './util';

import styleCSS from './lwdc-text.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-text')
export class TextElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	name?: String;

	@property({ type: String, attribute: true, reflect: true })
	list?: String;

	@property({ type: String, attribute: true, reflect: true })
	value?: String;

	@property({ type: Boolean, attribute: true, reflect: true })
	password = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: String;



	static formAssociated = true;

	//https://web.dev/more-capable-form-controls/#event-based-api
	//https://github.com/microsoft/TypeScript/issues/33218
	internals?: any;


	//disable shadow DOM so containing wdc-form class relative css can be applied.
	//Further investigation is needed to see how ::slotted could be incorporated into and contributed via a pull request
	//https://github.com/Workday/canvas-kit/blob/master/modules/form-field/css/lib/form-field.scss
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-text');
		super.connectedCallback();
	}

	firstUpdated() {
		this.internals = (this as any).attachInternals();
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}

	static get styles() {
		return [style];
	}

	render() {

		let formTextClass = {
			'wdc-form-textinput': true,
			'wdc-form-disabled': this.disabled
		};

		return html`<div class="${classMap(formTextClass)}">
						<input formnovalidate type="${this.password ? 'password' : 'text'}" .value="${ifDefined(this.value)}" list="${ifDefined(this.list)}" placeholder="${ifDefined(this.placeholder)}" ?disabled=${this.disabled} @change=${this.handleChange}></input>
					</div>
					`;
	}


	get formField() {
		return this.closest('lwdc-form-field') as FormFieldElement;
	}

	handleChange(e: any) {
		this.value = e.target.value;
		this.internals.setFormValue(this.value);
		this.checkValidity();
	}


	checkValidity() {
		let minLength = this.hasAttribute('required') ? 1 : 0;
		let minLengthAttr = this.getAttribute('minlength');
		minLength = minLengthAttr ? parseInt(minLengthAttr) : minLength;
		if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.value || this.value.length < minLength))) {
			this.internals.setValidity({ customError: true }, !this.value ? `${this.formField.label} is required` : `${minLength} characters are required`);
			this.formField.hintText = this.internals.validationMessage;
		} else {
			this.internals.setValidity({ customError: false }, undefined);
			this.formField.hintText = undefined;
		}
		return this.internals.checkValidity();
	}

	formResetCallback() {
		this.value = undefined;
		this.internals.setFormValue(this.value);
		this.internals.setValidity({ customError: false }, undefined);
		this.formField.hintText = undefined;
	}


}

export default TextElement;







