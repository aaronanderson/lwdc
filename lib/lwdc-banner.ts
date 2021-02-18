import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-banner.scss';
const style = css([`${styleCSS}`] as any)


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
			<a class="${classMap(bannerClass)}" href="${this.href}">
				<span class="wdc-banner-text">${this.text}</span>
				<span class="wdc-banner-link">${this.link}</span>
			</a>

		`;
	}

}

export default BannerElement;
