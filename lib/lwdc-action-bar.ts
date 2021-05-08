import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {classMap} from  'lit/directives/class-map.js';

import styleCSS from './lwdc-action-bar.scss';
import { styleLightDOM } from './util';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-action-bar')
export class ActionBarElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	fixed: boolean = false;

	@property({ type: Array })
	elementChildNodes: Array<ChildNode> = [];


	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-action-bar');
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
	}

	//needs to be in the light DOM due to CSS :first child selector not including ::slotted(*:not(:first-child))
	createRenderRoot() {
		return this;
	}

	static get styles() {
		return [style];
	}

	render() {
		let actionBarClass = {
			'wdc-action-bar': true,
			'wdc-action-bar-fixed': this.fixed
		};

		return html`
			<div class=${classMap(actionBarClass)} role="region" aria-label="Action Bar">
  				<div class="wdc-action-bar-container">
    				${this.elementChildNodes}
  				</div>
			</div>

		`;
	}

}

export default ActionBarElement;
