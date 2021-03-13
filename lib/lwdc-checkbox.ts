import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { styleLightDOM, formElement } from './util';
import {CanvasTheme, themeElement} from './theme';

import styleCSS from './lwdc-checkbox.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-checkbox')
export class CheckboxElement extends themeElement(formElement(LitElement)) {

	@property({ type: String, attribute: true, reflect: true })
	label?: String;

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
		styleLightDOM(this, style, 'lwdc-checkbox');
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
			'wdc-form-checkbox': true,
			'wdc-form-disabled': this.disabled
		};
		//https://bugzilla.mozilla.org/show_bug.cgi?id=1459865 - for firefox set autocomplete="off" so checkbox reset is applied
		return html`<div class="${classMap(formTextClass)}">
						  <input type="checkbox" ?checked="${this.checked}" ?disabled=${this.disabled} @change=${this.handleChange}/></input>
        				  <label htmlFor="checkbox">${this.label}</label>
					</div>
					`;

	}

	handleChange(e: any) {
		this.checked = e.target.checked;
		this._internals.setFormValue(this.checked);
		this.checkValidity();
	}

	checkValidity() {
		if (!this.matches(':disabled') && (this.hasAttribute('required') && !this.checked)) {
			this.setInternals(true, () => `${this.formField.label} is required`);
		} else {
			this.setInternals(false);
		}
		return this._internals.checkValidity();
	}

	formResetCallback() {
		this._internals.setValidity({ customError: false }, undefined);
		this.formField.hintText = undefined;
		this.checked = false;
		this._internals.setFormValue(false);
	}

	themeChanged(theme: CanvasTheme) {
		//this.style.setProperty('--lwdc-theme-primary-main', theme.palette.primary.main);
		//this.style.setProperty('--lwdc-theme-primary-contrast', theme.palette.primary.contrast);
	}

}

export default CheckboxElement;
