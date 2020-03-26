import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-card.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-card')
export class CardElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';

	@property({ type: Number, attribute: true, reflect: true })
	size?: number = undefined;

	static get styles() {
		return [style];
	}

	render() {
		let className = this.size ? `wdc-card-${this.size}` : `wdc-card`;
		return html`
			<div class="${className}">
				 <h3 class="wdc-card-heading">${this.title}</h3>
          		 <div class="wdc-card-body"><slot></slot></div>
			</div>
		
		`;
	}

}

@customElement('lwdc-card-container')
export class CardContainerElement extends LitElement {

	static get styles() {
		return [style];
	}

	render() {
		return html`
			<div class="wdc-card-container">
				<slot></slot>
			
			</div>
		
		`;
	}

}

export default CardContainerElement;








