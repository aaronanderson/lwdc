import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const style = css(<any>[require('./lwdc-header.scss').default]);

@customElement('lwdc-header')
export class HeaderElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';


	@property({ type: String, attribute: true, reflect: true })
	imgURL: string = '//design.workday.com/images/ck-wday-logo-white.svg';

	@property({ type: Object })
	variant: Variant = Variant.full;

	@property({ type: Object })
	theme: Theme = Theme.blue;

	static get styles() {
		return [style];
	}

	render() {
		let headerClass = {
			'lwdc-large': this.variant == Variant.full,
			'lwdc-small': this.variant != Variant.full,
			'lwdc-blue': this.theme == Theme.blue

		};
		return html`<header class="${classMap(headerClass)}">
			<slot name="brand">
				<a href="#" class="brandLink">
					${this.variant == Variant.full ? this.fullLogoTitle : this.dubLogoTitle}
				</a>
			</slot>
			<slot id="children"></slot>
		
		</header>`;
	}


	get fullLogoTitle() {
		let lockupClass = {
			'lockup': true,
			'lwdc-large': this.variant == Variant.full,
			'lwdc-small': this.variant != Variant.full,

		};
		let titleClass = {
			'logoTitle': true,
			'lwdc-blue': this.theme == Theme.blue

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


export enum Variant {
	full,
	dub,
	global
}

export enum Theme {
	white,
	blue,
	transparent
}

export default HeaderElement;








