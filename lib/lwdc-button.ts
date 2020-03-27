import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-button.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-button')
export class ButtonElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: Object })
	type: ButtonType = ButtonType.primary;

	@property({ type: Object })
	size: ButtonSize = ButtonSize.medium;

	/*elementChildNodes: Array<ChildNode> = [];

	connectedCallback() {
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
	}

	createRenderRoot() {
		return this;
	}*/

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
			'wdc-btn': this.type != ButtonType.plain,
			'wdc-btn-icon-plain': this.type == ButtonType.plain,
			'wdc-btn-icon-circle': this.type == ButtonType.iconCircle,
			'wdc-btn-icon-circle-filled': this.type == ButtonType.iconCircleFilled,
			'wdc-btn-icon-inverse': this.type == ButtonType.iconInverse,
			'wdc-btn-primary': this.type == ButtonType.primary,
			'wdc-btn-delete': this.type == ButtonType.delete,
			'wdc-btn-size-l': this.size == ButtonSize.large,
			'wdc-btn-size-s': this.size == ButtonSize.small
		};

		return html`<button class="${classMap(buttonClass)}"><slot></slot></button>`;

	}

}

export enum ButtonType {
	primary,
	secondary,
	delete,
	plain,
	iconCircle,
	iconCircleFilled,
	iconInverse
}

export enum ButtonSize {
	small,
	medium,
	large
}
export default ButtonElement;







