import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';


import './lwdc-button';
import './lwdc-icon';
import { ButtonType } from './lwdc-button';
import { xIcon } from '@workday/canvas-system-icons-web';

import styleCSS from './lwdc-modal.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-modal')
export class ModalElement extends LitElement {

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
			<div class="wdc-modal-bg">
				<div class="wdc-modal" role="dialog" aria-labelledby="modal-heading">
					${this.closeEnabled ? html`<div class="wdc-popup-close">
						 <div class="wdc-modal-close">
							<lwdc-button .type=${ButtonType.plain} @click=${this.close} aria-label="Close">
								<lwdc-icon .icon=${xIcon}></lwdc-icon>
							</lwdc-button>
						</div>
					</div>`: null}
					${this.title ? html`<div class="wdc-modal-heading">${this.title}</div>` : null}
					<div class="wdc-modal-body">
						<slot></slot>
					</div>
				</div>				
			</div>	
		`;
		} else {
			return html``;
		}
	}

	open() {
		this.dispatchEvent(new CustomEvent(`lwdc-modal-open`, {
			//bubbles: true,
			//composed: true,
			detail: {				
			}
		}));
		this.isOpen = true;
	}

	close() {
		this.dispatchEvent(new CustomEvent(`lwdc-modal-close`, {
			//bubbles: true,
			//composed: true,
			detail: {				
			}
		}));
		this.isOpen = false;
	}

}

export default ModalElement;








