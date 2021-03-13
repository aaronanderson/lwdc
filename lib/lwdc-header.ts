import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import {CanvasTheme, themeElement} from './theme';

import depth from '@workday/canvas-depth-web/dist/ts/canvas-depth';

import styleCSS from './lwdc-header.scss';
const style = css([`${styleCSS}`] as any)

const themeDepth = depth[3] as any;
const depthStyle = css([`.lwdc-depth {
	${themeDepth.boxShadow? `box-shadow: ${themeDepth.boxShadow};`: ''}
	${themeDepth.border? `border: ${themeDepth.border};`: ''}
}`] as any);


@customElement('lwdc-header')
export class HeaderElement extends themeElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';


	@property({ type: String, attribute: true, reflect: true })
	imgURL: string = '//design.workday.com/images/ck-wday-logo-white.svg';

	@property({ type: Object })
	variant: HeaderVariant = HeaderVariant.full;

	@property({ type: Object })
	theme: HeaderTheme = HeaderTheme.blue;

	@property({ type: Array })
	elementChildNodes: Array<ChildNode> = [];

	navItems : Array<HTMLElement> = [];

	connectedCallback() {
		this.elementChildNodes = Array.from(this.childNodes).filter((n : Node) => {
			if (n.nodeType === Node.ELEMENT_NODE){
			  if ((n as Element).hasAttribute("slot")){
					return false;
				} else if (n.nodeName === 'NAV'){
					this.navItems = Array.from((n as HTMLElement).querySelectorAll("ul > li"));
				}
			}
			return true;
		});
		super.connectedCallback();
		this.navItems.forEach((n)=> n.addEventListener("click", this.handleItemClicked.bind(this)));

	}

	static get styles() {
		return [style, depthStyle];
	}

	render() {
		let headerClass = {
			'lwdc-large': this.variant == HeaderVariant.full,
			'lwdc-small': this.variant != HeaderVariant.full,
			'lwdc-blue': this.theme == HeaderTheme.blue,
			'lwdc-depth': true,

		};
		return html`<header class="${classMap(headerClass)}">
			<slot name="brand">
				<a href="#" class="brandLink">
					${this.variant == HeaderVariant.full ? this.fullLogoTitle : this.dubLogoTitle}
				</a>
			</slot>

			<div id="children">
				${this.elementChildNodes}
			</div>


		</header>`;
		//	<slot id="children"></slot>
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

	handleItemClicked(e: MouseEvent){
		this.navItems.forEach((n)=> n == e.currentTarget? n.classList.add("current") : n.classList.remove("current"));
	}

	themeChanged(theme: CanvasTheme) {
		//this.style.setProperty('--lwdc-theme-primary-main', theme.palette.primary.main);
		//this.style.setProperty('--lwdc-theme-primary-contrast', theme.palette.primary.contrast);
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
