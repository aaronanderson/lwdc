import { LitElement, html, css, customElement, property, query } from 'lit-element';

import styleCSS from './lwdc-color-input.scss';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleLightDOM, formElement } from './util';

import { ErrorType } from './lwdc-form-field';

const style = css([`${styleCSS}`] as any)

// @ts-ignore
import pickForegroundColor from '@workday/canvas-kit-css-icon/lib/canvas-kit-css-icon.js';
import { checkSmallIcon } from '@workday/canvas-system-icons-web';
import { colors } from '@workday/canvas-colors-web/dist/ts/canvas-colors-hex';

//git diff HEAD 'HEAD@{2020-09-05}' -- modules/color-picker/react/lib

@customElement('lwdc-color-input')
export class ColorInputElement extends formElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	value?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	showCheck = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: string;

	@query('input')
	colorInput?: HTMLDivElement;
	//disable shadow DOM so containing wdc-form class relative css can be applied.
	//Further investigation is needed to see how ::slotted could be incorporated into and contributed via a pull request
	//https://github.com/Workday/canvas-kit/blob/master/modules/form-field/css/lib/form-field.scss
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-color-input');
		super.connectedCallback();
	}

	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}

	render() {
		const formattedValue = this.formatValue(this.value);
		const placeholder = this.placeholder? this.placeholder : 'FFFFFF';
		return html`
		<div class="lwdc-color-input-container">
			<input type="text" dir="ltr" placeholder=${placeholder} spellcheck="false" maxlength="7" ?disabled=${this.disabled} @change=${this.handleChange} class="lwdc-color-input-text" value=${formattedValue}></input>
			<lwdc-color-swatch check=${this.showCheck} color=${this.value}></lwdc-color-swatch>
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
		if (!this.matches(':disabled') && this.hasAttribute('required') && this.value === '') {
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

}

@customElement('lwdc-color-swatch')
export class ColorSwatchElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	color?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	showCheck = false;

	createRenderRoot() {
		return this;
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
			${this.showCheck? html `<lwdc-icon .icon=${checkSmallIcon} .color="${this.color}" .fill="{pickForegroundColor(this.color)}" .fillHover="{pickForegroundColor(this.color)}" ></lwdc-icon>` : undefined}
		</div>
		`;
	}

}


export default ColorInputElement;
