import { LitElement, html, css, customElement, property } from 'lit-element';
import { checkIcon } from '@workday/canvas-system-icons-web';
import PopupElement from './lwdc-popup';
import { CanvasIcon } from '@workday/design-assets-types';

import './lwdc-popup';
import './lwdc-icon';

import styleCSS from './lwdc-toast.scss';
const style = css([`${styleCSS}`] as any)

//git diff HEAD 'HEAD@{2020-04-18}' -- modules/toast/react/lib

@customElement('lwdc-toast')
export class ToastElement extends LitElement {

	@property({ type: Object })
	icon: CanvasIcon = checkIcon;

	@property({ type: String, attribute: true, reflect: true })
	iconColor = 'greenApple400';

	@property({ type: String, attribute: true, reflect: true })
	message = '';

	@property({ type: String, attribute: 'action-text' })
	actionText = '';

	static get styles() {
		return [style];
	}






	render() {
		return html`
			<lwdc-popup>	
				
				<div class="lwdc-toast-container wdc-type-body-2">

					<span class="lwdc-toast-icon">
						<lwdc-icon .icon=${this.icon} .color=${this.iconColor}></lwdc-icon>
					</span>
					<div class="lwdc-toast-message">${this.message}${this.action}</div>
				</div>
				
			</lwdc-popup>	
		`;

	}

	get popup() {
		return this.shadowRoot && this.shadowRoot.querySelector("lwdc-popup") as PopupElement;
	}

	get action() {
		if (!!this.actionText) {
			return html`<button class="wdc-type-body-2 wdc-type-variant-link lwdc-toast-button" @onclick=${this.actionHandler}>${this.actionText}</button>`;
		} else {
			return html``;
		}
	}

	actionHandler() {
		this.dispatchEvent(new CustomEvent(`lwdc-toast-action`));
	}

	open() {
		this.popup!.open();
	}

	close() {
		this.popup!.close();
	}


}

export default ToastElement;






