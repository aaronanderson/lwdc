import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import FormFieldElement from './lwdc-form-field';
import { styleLightDOM, formElement } from './util';

import styleCSS from './lwdc-textarea.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-textarea')
export class TextAreaElement extends formElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	name?: String;

	@property({ type: String, attribute: true, reflect: true })
	value?: String;

	@property({ type: Boolean, attribute: true, reflect: true })
	password = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: String;



	//disable shadow DOM so containing wdc-form class relative css can be applied.
	//Further investigation is needed to see how ::slotted could be incorporated into and contributed via a pull request
	//https://github.com/Workday/canvas-kit/blob/master/modules/form-field/css/lib/form-field.scss
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-textarea');
		super.connectedCallback();
	}

	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}

	static get styles() {
		return [style];
	}

	render() {

		let formTextAreaClass = {
			'wdc-form-textarea': true,
			'wdc-form-disabled': this.disabled
		};

		return html`<div class="${classMap(formTextAreaClass)}">
						<textarea formnovalidate .value="${ifDefined(this.value)}" placeholder="${ifDefined(this.placeholder)}" ?disabled=${this.disabled} @change=${this.handleChange} @blur=${this.handleChange}></textarea>
					</div>
					`;
	}

	handleChange(e: any) {
		this.value = e.target.value;
		this.internals.setFormValue(this.value);
		this.checkValidity();
	}


}

export default TextAreaElement;







