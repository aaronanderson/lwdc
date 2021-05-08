import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement, query} from 'lit/decorators.js';


import styleCSS from './lwdc-color-input.scss';
import {classMap} from  'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleLightDOM, FormBaseElement } from './util';

import { ErrorType } from './lwdc-form-field';

const style = css([`${styleCSS}`] as any) as CSSResult;

// @ts-ignore
import pickForegroundColor from '@workday/canvas-kit-css-icon/lib/canvas-kit-css-icon.js';
import { checkSmallIcon } from '@workday/canvas-system-icons-web';
import { colors } from '@workday/canvas-colors-web/dist/ts/canvas-colors-hex';

//git diff HEAD 'HEAD@{2020-09-05}' -- modules/color-picker/react/lib

@customElement('lwdc-color-input')
export class ColorInputElement extends FormBaseElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	value?: string;

	@property({ type: Boolean, attribute: 'show-check', reflect: true })
	showCheck = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	preview = false;

	@query('input')
	colorInput?: HTMLDivElement;

	static get styles() {
		return [style];
	}

	render() {
		const formattedValue = this.formatValue(this.value);
		let placeholder = 'FFFFFF';
		if (this.placeholder){
			placeholder = this.placeholder;
		}
		if (this.preview){
			placeholder = '';
		}

		let inputClass = {
			'lwdc-color-input-preview': !!this.preview,
			'lwdc-color-input-text': true,
		};
		return html`
		<div class="lwdc-color-input-container">
			<input type="text" dir="ltr" placeholder=${placeholder} spellcheck="false" maxlength="7" ?disabled=${this.disabled} ?readonly=${!!this.preview} @change=${this.handleChange} class=${classMap(inputClass)} value=${formattedValue}></input>
			<lwdc-color-swatch ?show-check=${this.showCheck} color=${this.value}></lwdc-color-swatch>
			<span class="lwdc-color-input-pound-sign-prefix">#</span>
		</div>
		`;
	}

	private 	handleChange(e: any) {
		const value = this.formatValue(e.currentTarget.value);

		if (this.isValidHex(value) || value === ''){
			this.dispatchEvent(new CustomEvent(`lwdc-color-input-valid-change`, {detail: {color: `#${this.expandHex(value)}`}}));
		  this.value = value;
		  this._internals.setFormValue(value);
		  this.checkValidity();
		}

	};

	private isValidHex (value: string) {
    return /(^#?[0-9A-F]{3}$)|(^#?[0-9A-F]{6}$)/i.test(value);
  };

	private formatValue(value?: string){
		return value? value.replace(/#/g, '').substring(0, 6): '';
	};

	private expandHex(hex: string) {
	  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	  return hex.replace(shorthandRegex, function(m, r, g, b) {
	    return r + r + g + g + b + b;
	  });
	}

	checkValidity() {
		if (!this.matches(':disabled') && this.hasAttribute('required') && !this.value) {
			let message = this.formField ? `${this.formField.label} is required` : 'Required';
			this.setInternals(true, () => message);
			if (this.colorInput && this.formField) {
				if (this.formField.errorType == ErrorType.alert) {
					this.colorInput.classList.add('lwdc-color-input-alert');
				} else {
					this.colorInput.classList.add('lwdc-color-input-error');
				}
			}
		} else {
			this.setInternals(false);
			if (this.colorInput && this.formField) {
				this.colorInput.classList.remove('lwdc-color-input-alert', 'lwdc-color-input-error');
			}
		}
		return this._internals.checkValidity();
	}

	formResetCallback() {
		super.formResetCallback();
		this.value = undefined;
		if (this.colorInput && this.formField) {
			this.colorInput.classList.remove('lwdc-color-input-alert', 'lwdc-color-input-error');
		}
		this.requestUpdate();
	}

}

@customElement('lwdc-color-swatch')
export class ColorSwatchElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	color?: string;

	@property({ type: Boolean, attribute: 'show-check', reflect: true })
	showCheck = false;

	static get styles() {
		return [style];
	}

	updated(changedProperties: Map<string, any>) {
		const swatchColor = this.color  === undefined ? colors.frenchVanilla100 : `#${this.color}`;
		if (changedProperties.has("color")) {
			this.style.setProperty('--lwdc-color-swatch-color', swatchColor);
		}
		const boxShadow = this.showCheck || swatchColor === colors.frenchVanilla100  ? 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.25)' : null;
		this.style.setProperty('--lwdc-color-swatch-box-shadow', boxShadow);
	}

	render() {
		return html`
		<div class="lwdc-color-input-color-swatch">
			${this.showCheck? html `<lwdc-icon .icon=${checkSmallIcon} .color=${this.color} .fill=${pickForegroundColor(this.color)} .fillHover=${pickForegroundColor(this.color)} ></lwdc-icon>` : undefined}
		</div>
		`;
	}

}


export default ColorInputElement;
