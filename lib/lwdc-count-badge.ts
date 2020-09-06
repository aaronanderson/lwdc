import { LitElement, html, css, customElement, property } from 'lit-element';

import styleCSS from './lwdc-count-badge.scss';
import { classMap } from 'lit-html/directives/class-map';

const style = css([`${styleCSS}`] as any)


@customElement('lwdc-count-badge')
export class CountBadgeElement extends LitElement {

	@property({ type: Number, attribute: true, reflect: true })
	count?: number = undefined;

	@property({ type: Boolean, attribute: true, reflect: true })
	inverse= false;

	static get styles() {
		return [style];
	}

	render() {
		let countBadgeClass = {
			'wdc-count-badge': !this.inverse,
			'wdc-count-badge-inverse': this.inverse
		};
		return html`
		<span class="${classMap(countBadgeClass)}">${this.count}</span>
		`;
	}

}

export default CountBadgeElement;
