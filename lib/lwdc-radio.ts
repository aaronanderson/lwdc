import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import FormFieldElement from './lwdc-form-field';
import { styleLightDOM } from './util';
const style = css(<any>[require('./lwdc-radio.scss').default]);


@customElement('lwdc-radio')
export class RadioElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	name?: String;

	@property({ type: String, attribute: true, reflect: true })
	label?: String;

	@property({ type: String, attribute: true, reflect: true })
	value?: String;


	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;



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
		styleLightDOM(this, style, 'lwdc-radio');
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
			'wdc-form-radio': true,
			'wdc-form-disabled': this.disabled
		};

		return html`<div class="${classMap(formTextClass)}">
						  <input type="radio" id="radio" .value="${ifDefined(this.value)}" ?disabled=${this.disabled} @change=${this.handleChange}/></input>
        				  <label htmlFor="radio">${this.label}</label>							
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
		if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.value))) {
			this.internals.setValidity({ customError: true }, `${this.formField.label} is required`);
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
	}


}

export default RadioElement;







