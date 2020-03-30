import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-button.scss';
import { ifDefined } from 'lit-html/directives/if-defined';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-button')
export class ButtonElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	dropdown = false;

	@property({ type: Object })
	type: ButtonType = ButtonType.primary;

	@property({ type: Object })
	size: ButtonSize = ButtonSize.medium;

	@property({ type: Object })
	text: ButtonText = ButtonText.large;

	@property({ type: Boolean, attribute: true, reflect: true })
	inverse = false;

	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}


	static get styles() {
		return [style];
	}

	render() {

		let buttonClass = {
			'wdc-btn': this.type != ButtonType.plain && this.type != ButtonType.text,
			'wdc-btn-dropdown': this.dropdown,
			//'wdc-btn-disabled': this.disabled,
			'wdc-btn-icon-plain': this.type == ButtonType.plain,
			'wdc-btn-icon-circle': this.type == ButtonType.iconCircle,
			'wdc-btn-icon-circle-filled': this.type == ButtonType.iconCircleFilled,
			'wdc-btn-icon-inverse': this.type == ButtonType.iconInverse,
			'wdc-btn-primary': this.type == ButtonType.primary,
			'wdc-btn-delete': this.type == ButtonType.delete,
			'wdc-btn-size-l': this.size == ButtonSize.large,
			'wdc-btn-size-s': this.size == ButtonSize.small,
			'wdc-btn-text': this.type == ButtonType.text,
			'wdc-btn-text-size-s': this.type == ButtonType.text && this.text == ButtonText.small,
			'wdc-btn-text-all-caps': this.type == ButtonType.text && this.text == ButtonText.allCaps,
			'wdc-btn-text-inverse': this.type == ButtonType.text && this.inverse

		};

		return html`<button ?disabled="${this.disabled}" class="${classMap(buttonClass)}"><slot></slot></button>`;

	}

}

export enum ButtonType {
	primary,
	default,
	delete,
	plain,
	iconCircle,
	iconCircleFilled,
	iconInverse,
	text
}

export enum ButtonSize {
	small,
	medium,
	large
}

export enum ButtonText {
	large,
	small,
	allCaps
}
export default ButtonElement;







