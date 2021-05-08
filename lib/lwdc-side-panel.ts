import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import { chevronRightIcon, chevronLeftIcon } from '@workday/canvas-system-icons-web';
import { ButtonType } from './lwdc-button';

import './lwdc-button';

import styleCSS from './lwdc-side-panel.scss';
const style = css([`${styleCSS}`] as any)

//git diff HEAD 'HEAD@{2020-04-18}' -- modules/side-panel/react/lib

@customElement('lwdc-side-panel')
export class SidePanelElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	header: string = '';

	@property({ type: Boolean })
	isOpen = true;

	static get styles() {
		return [style];
	}

	firstUpdated() {
		this.fireEvent();
	}

	render() {
		let modeClass = {
			'lwdc-open': this.isOpen,
			'lwdc-close': !this.isOpen
		};

		let containerClass = {
			'container': true,
			'lwdc-open': this.isOpen,
			'lwdc-close': !this.isOpen
		};

		let footerClass = {
			'footer': true,
			'lwdc-open': this.isOpen,
			'lwdc-close': !this.isOpen
		};

		return html`<aside class=${classMap(modeClass)}>
			<div class=${classMap(containerClass)}>
			 	${this.header && this.isOpen ? html`<h2 class="header">${this.header}</h2>` : undefined}
				<slot></slot>
			</div>
			<div class=${classMap(footerClass)}>
				<lwdc-button .type=${ButtonType.iconCircleFilled}><lwdc-icon .icon=${this.isOpen ? chevronLeftIcon : chevronRightIcon} @click=${() => this.toggle()}></lwdc-icon> </lwdc-button>
			</div>
		
		</aside>`;
	}


	toggle() {
		this.isOpen = !this.isOpen;
		this.fireEvent();
	}

	fireEvent() {
		this.dispatchEvent(new CustomEvent('lwdc-side-panel-toggle', {
			detail: {
				opened: this.isOpen
			}
		}));
	}


}


export enum SidePanelDirection {
	left,
	right
}


export default SidePanelElement;








