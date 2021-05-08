import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {classMap} from  'lit/directives/class-map.js';

import styleCSS from './lwdc-banner.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-banner')
export class BannerElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	href: string = '#';

	@property({ type: String, attribute: true, reflect: true })
	text: string = '';

	@property({ type: String, attribute: true, reflect: true })
	link: string = '';

	@property({ type: Boolean, attribute: true, reflect: true })
	sticky: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	error: boolean = false;

	static get styles() {
		return [style];
	}

	render() {
		let bannerClass = {
			'wdc-banner': true,
			'wdc-banner-sticky': this.sticky,
			'wdc-banner-error': this.error
		};
		return html`
			<a class=${classMap(bannerClass)} href=${this.href}>
				<span class="wdc-banner-text"><slot></slot></span>
				<span class="wdc-banner-link">${this.link}</span>
			</a>

		`;
	}

}

export default BannerElement;
