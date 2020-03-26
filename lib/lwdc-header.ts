import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-header.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-header')
export class HeaderElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';


	@property({ type: String, attribute: true, reflect: true })
	imgURL: string = '//design.workday.com/images/ck-wday-logo-white.svg';

	@property({ type: Object })
	variant: HeaderVariant = HeaderVariant.full;

	@property({ type: Object })
	theme: HeaderTheme = HeaderTheme.blue;

	static get styles() {
		return [style];
	}

	render() {
		let headerClass = {
			'lwdc-large': this.variant == HeaderVariant.full,
			'lwdc-small': this.variant != HeaderVariant.full,
			'lwdc-blue': this.theme == HeaderTheme.blue

		};
		return html`<header class="${classMap(headerClass)}">
			<slot name="brand">
				<a href="#" class="brandLink">
					${this.variant == HeaderVariant.full ? this.fullLogoTitle : this.dubLogoTitle}
				</a>
			</slot>
			<slot id="children"></slot>
		
		</header>`;
	}


	get fullLogoTitle() {
		let lockupClass = {
			'lockup': true,
			'lwdc-large': this.variant == HeaderVariant.full,
			'lwdc-small': this.variant != HeaderVariant.full,

		};
		let titleClass = {
			'logoTitle': true,
			'lwdc-blue': this.theme == HeaderTheme.blue

		};

		return html`
		<div class="lockupContainer">
			<div class="${classMap(lockupClass)}">
				<span class="logo">
					<img src="${this.imgURL}"/>
				</span>
				<h3 class=${classMap(titleClass)}>${this.title}</h3>
				
			</div>
		</div>
		
		`;
	}

	get dubLogoTitle() {
		return html``;
	}

}


export enum HeaderVariant {
	full,
	dub,
	global
}

export enum HeaderTheme {
	white,
	blue,
	transparent
}

export default HeaderElement;








