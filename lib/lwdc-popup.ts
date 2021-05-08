import { LitElement, html, css, customElement, property } from 'lit-element';

import './lwdc-button';
import './lwdc-icon';
import { ButtonType } from './lwdc-button';
import { xIcon } from '@workday/canvas-system-icons-web';

import styleCSS from './lwdc-popup.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-popup')
export class PopupElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	closeEnabled = true;

	@property({ type: Boolean })
	isOpen = false;

	static get styles() {
		return [style];
	}

	render() {
		if (this.isOpen) {
			return html`
			<div class="wdc-popup" role="dialog" aria-labelledby="popup-heading">
				
				${this.closeEnabled ? html`<div class="wdc-popup-close">
					<lwdc-button .type=${ButtonType.plain} @click=${this.close} aria-label="Close">
						<lwdc-icon .icon=${xIcon}></lwdc-icon>
					</lwdc-button>
				</div>`: null}
				${this.title ? html`<div class="wdc-popup-heading">${this.title}</div>` : null}
				<div class="wdc-popup-body">
					<slot></slot>
				</div>				
			</div>	
		`;
		} else {
			return html``;
		}
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

}

export default PopupElement;








