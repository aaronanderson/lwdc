import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';


import styleCSS from './lwdc-loading.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-loading')
export class LoadingElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	loading?= false;

	static get styles() {
		return [style];
	}

	render() {
		return html`
		<div class="wdc-loading-dots">		
      		<span/>
		</div>
		`;
	}

}

export default LoadingElement;







