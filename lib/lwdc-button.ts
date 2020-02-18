import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const style = css(<any>[require('./lwdc-button.scss').default]);


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

		let formTextClass = {
			'wdc-btn': this.type != ButtonType.plain,
			'wdc-btn-icon-plain': this.type == ButtonType.plain,
			'wdc-btn-primary': this.type == ButtonType.primary,
			'wdc-btn-delete': this.type == ButtonType.delete,
			'wdc-btn-size-l': this.size == ButtonSize.large,
			'wdc-btn-size-s': this.size == ButtonSize.small
		};

		return html`<button class="${classMap(formTextClass)}"><slot></slot></button>`;

	}

}

export enum ButtonType {
	primary,
	secondary,
	delete,
	plain
}

export enum ButtonSize {
	small,
	medium,
	large
}
export default ButtonElement;







