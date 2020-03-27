import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-action-bar.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-action-bar')
export class ActionBarElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	fixed: boolean = false;

	static get styles() {
		return [style];
	}

	render() {
		let actionBarClass = {
			'wdc-action-bar': true,
			'wdc-action-bar-fixed': this.fixed
		};

		return html`
			<div class="${classMap(actionBarClass)}" role="region" aria-label="Action Bar">
  				<div class="wdc-action-bar-container">
    				<slot></slot>
  				</div>
			</div>
		
		`;
	}

}

export default ActionBarElement;








