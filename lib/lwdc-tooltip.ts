import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { styleLightDOM } from './util';

import styleCSS from './lwdc-tooltip.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-tooltip')
export class TooltipElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	message?: string | undefined;

	@property({ type: Array })
	elementChildNodes: Array<ChildNode> = [];


	static get styles() {
		return [style];
	}

	reateRenderRoot() {
		return this;
	}

	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-tooltip');
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
	}

	render() {
		return html`		
		<div class="wdc-tooltip-container">		
			   ${this.elementChildNodes}
			   <div class="wdc-tooltip wdc-tooltip-top">${this.message}</div>
		</div>
		`;
	}

}

export default TooltipElement;







