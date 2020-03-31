import { LitElement, html, css, customElement, property } from 'lit-element';

import styleCSS from './lwdc-loading.scss';
const style = css([`${styleCSS}`] as any)


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







