import { LitElement, html, css, customElement, property } from 'lit-element';
import { styleLightDOM } from './util';

const style = css(<any>[require('./lwdc-tooltip.scss').default]);


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
			   <div class="wdc-tooltip wdc-tooltip-top" id="tooltip">${this.message}</div>
		</div>
		`;
	}

}

export default TooltipElement;







