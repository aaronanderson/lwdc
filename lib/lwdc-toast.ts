import { LitElement, html, css, customElement, property } from 'lit-element';

// @ts-ignore
//import initializeIcons from '@workday/canvas-kit-css-icon/lib/canvas-kit-css-icon.js';

const style = css(<any>[require('./lwdc-toast.scss').default]);

import './lwdc-popper';
import './lwdc-icon';

import { checkIcon } from '@workday/canvas-system-icons-web';


import PopperElement from './lwdc-popper';
import { CanvasIcon } from '@workday/design-assets-types';

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
			<lwdc-popper>	
				
				<div class="lwdc-toast-container wdc-type-body-2">

					<span id="toast-icon" class="lwdc-toast-icon">
						<lwdc-icon .icon=${this.icon} .color=${this.iconColor}></lwdc-icon>
					</span>
					<div class="lwdc-toast-message">${this.message}${this.action}</div>
				</div>
				
			</lwdc-popper>	
		`;

	}

	get popper() {
		return this.shadowRoot && this.shadowRoot.querySelector("lwdc-popper") as PopperElement;
	}

	get action() {
		console.log(this.actionText);
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
		this.popper!.open();
	}

	close() {
		this.popper!.close();
	}


}

export default ToastElement;






