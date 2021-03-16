import { LitElement, html, css, customElement, property, query } from 'lit-element';
import { formElement } from './util';
import {lwdcTheme} from './theme';
import { ErrorType } from './lwdc-form-field';
import {colors} from '@workday/canvas-colors-web';

import styleCSS from './lwdc-switch.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-switch')
export class SwitchElement extends formElement(LitElement) {

	@property({ type: Boolean, attribute: true, reflect: true })
	checked = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@query("input")
	switchInput!: HTMLInputElement;


	static get styles() {
		return [style];
	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("disabled")) {
				this.style.setProperty('--lwdc-switch-cursor', this.disabled? 'not-allowed' :'pointer');
		}
		if (this.checked) {
				  this.style.setProperty('--lwdc-switch-background-color', this.disabled? lwdcTheme.palette.primary.light : lwdcTheme.palette.primary.main);
					this.style.setProperty('--lwdc-switch-circle-translate', `translateX(16px)`);//spacing.s
		 } else {
			 	this.style.setProperty('--lwdc-switch-background-color', this.disabled ? colors.soap400 : colors.licorice200);
				this.style.setProperty('--lwdc-switch-circle-translate', 'translateX(0)');
	 	 }
		 this.style.setProperty('--lwdc-switch-circle-color', colors.frenchVanilla100);//consistent with checkbox //lwdcTheme.palette.primary.contrast


	}

	render() {
		return html`
		<div class="lwdc-switch-container">
      		<input class="lwdc-switch-input" role="checkbox" tabindex="0" type="checkbox" ?checked="${this.checked}" ?disabled=${this.disabled} @change=${this.handleChange}></input>
					<div class="lwdc-switch-background">
							<div class="lwdc-switch-circle"></div>
					</div>
		</div>
		`;
	}

	handleChange(e: any) {
		console.log(e);
		this.checked = e.target.checked;
		this._internals.setFormValue(this.checked);
		this.checkValidity();
	}

	checkValidity() {
		if (this._customValidity) {
			return false;
		}
		if (!this.matches(':disabled') && (this.hasAttribute('required') && !this.checked)) {
			if (this.formField) {
				this.setInternals(true, () => `${this.formField.label} is required`);
				if (this.formField.errorType == ErrorType.alert) {
					this.switchInput.classList.add('lwdc-switch-alert');
				} else {
					this.switchInput.classList.add('lwdc-switch-error');
				}
			} else {
				this.setInternals(true, () => `Required`);
			}
		} else {
			this.setInternals(false);
			if (this.formField) {
				this.switchInput.classList.remove('lwdc-switch-error', 'lwdc-switch-alert');
			}
		}
		return this._internals.checkValidity();
	}


	formResetCallback() {
		super.formResetCallback();
		this.checked = false;
		if (this.formField) {
			this.switchInput.classList.remove('lwdc-switch-error', 'lwdc-switch-alert');
		}
		this.requestUpdate();
	}

}

export default SwitchElement;
