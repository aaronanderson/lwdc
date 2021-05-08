import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from  'lit/directives/class-map.js';
import { styleLightDOM } from './util';
import {lwdcTheme} from './theme';

import styleCSS from './lwdc-button.scss';

const style = css([`${styleCSS}`] as any) as CSSResult;


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

	@property({ type: String, attribute: true, reflect: true })
	action = "submit";

	@property({ type: Array })
	elementChildNodes: Array<ChildNode> = [];

	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-button');
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
		this.addEventListener('click', evt => { //this.shadowRoot!
		 	if (this.hasAttribute('disabled')) {
		 		evt.preventDefault();
		 		evt.stopImmediatePropagation();
		 	}
		 }, true);
	}

	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}


	render() {

		let buttonClass = {
			'wdc-btn': this.type != ButtonType.plain && this.type != ButtonType.text,
			'wdc-btn-dropdown': this.dropdown,
			//'wdc-btn-disabled': this.disabled,
			'wdc-btn-icon-plain': this.type == ButtonType.plain,
			'wdc-btn-icon-square': this.type == ButtonType.iconSquare,
			'wdc-btn-icon-square-filled': this.type == ButtonType.iconSquareFilled,
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

		return html`<button ?disabled=${this.disabled} type=${this.action} class=${classMap(buttonClass)}>${this.elementChildNodes}</button>`;

	}

}

export enum ButtonType {
	primary,
	default,
	delete,
	plain,
	iconSquare,
	iconSquareFilled,
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
