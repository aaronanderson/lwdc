import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';


import styleCSS from './lwdc-count-badge.scss';
import {classMap} from  'lit/directives/class-map.js';

const style = css([`${styleCSS}`] as any) as CSSResult;


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
		<span class=${classMap(countBadgeClass)}>${this.count}</span>
		`;
	}

}

export default CountBadgeElement;
