import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from  'lit/directives/class-map.js';
import FormFieldElement from './lwdc-form-field';
import { styleLightDOM, FormBaseElement } from './util';

import styleCSS from './lwdc-text.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-text')
export class TextElement extends FormBaseElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	list?: string;

	@property({ type: String, attribute: true, reflect: true })
	value?: string = undefined;

	@property({ type: Boolean, attribute: true, reflect: true })
	password = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: string;

	@property({ type: String, attribute: true, reflect: true })
	inputType: string = "text";

	@property({ type: Number, attribute: true, reflect: true })
	min?: number;

	@property({ type: Number, attribute: true, reflect: true })
	max?: number;

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
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}

	// static get styles() {
	// 	return [style];
	// }

	render() {

		let formTextClass = {
			'wdc-form-textinput': true,
			'wdc-form-disabled': this.disabled
		};

		return html`<div class=${classMap(formTextClass)}>
						<input formnovalidate type=${this.password ? 'password' : this.inputType} .min=${ifDefined(this.min)} .max=${ifDefined(this.max)} .value=${ifDefined(this.value)} list=${ifDefined(this.list)} placeholder=${ifDefined(this.placeholder)} ?disabled=${this.disabled} @change=${this.handleChange} @blur=${this.handleChange}></input>
					</div>
					`;
	}

	handleChange(e: any) {
		const oldValue = this.value;
		this.value = e.target.value;
		this._internals.setFormValue(this.value);
		if (oldValue != this.value){
			this.dispatchEvent(new CustomEvent(`lwdc-text-change`, {
				detail: {
					value: this.value
				}
			}));
		}
		this.checkValidity();
	}

}

export default TextElement;
