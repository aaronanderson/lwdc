import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from  'lit/directives/class-map.js';
import FormFieldElement from './lwdc-form-field';
import { styleLightDOM, FormBaseElement } from './util';

import styleCSS from './lwdc-radio.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-radio')
export class RadioElement extends FormBaseElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	label?: string;

	@property({ type: String, attribute: true, reflect: true })
	group?: string;

	@property({ type: String, attribute: true, reflect: true })
	value?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	checked = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;


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

		return html`<div class=${classMap(formTextClass)}>
						  <input type="radio" name=${ifDefined(this.formField.group)} ?checked=${this.checked} .value=${ifDefined(this.value)} id=${ifDefined(this.value)} ?disabled=${this.disabled} @change=${this.handleChange}></input>
        			<label for=${ifDefined(this.value)}>${this.label}</label>
					</div>
					`;
	}


	handleChange(e: any) {
		this.value = e.target.value;
		this._internals.setFormValue(this.value);
		this.checkValidity();
	}

}

export default RadioElement;
