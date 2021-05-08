import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import {colors, iconColors, gradients} from '@workday/canvas-colors-web';

import depth from '@workday/canvas-depth-web/dist/ts/canvas-depth';

import {lwdcTheme} from './theme';
import chroma from 'chroma-js';

import styleCSS from './lwdc-header.scss';
const style = css([`${styleCSS}`] as any)

// const themeDepth = depth[3] as any;
// const depthStyle = css([`.lwdc-depth {
// 	${themeDepth.boxShadow? `box-shadow: ${themeDepth.boxShadow};`: ''}
// 	${themeDepth.border? `border: ${themeDepth.border};`: ''}
// }`] as any);


@customElement('lwdc-header')
export class HeaderElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';


	@property({ type: String, attribute: true, reflect: true })
	imgURL?: string;

	@property({ type: Object })
	variant: HeaderVariant = HeaderVariant.Full;

	@property({ type: Object })
	theme: HeaderTheme = HeaderTheme.Dark;

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

	disconnectedCallback() {
		this.navItems.forEach((n)=> n.removeEventListener("click", this.handleItemClicked));
		super.disconnectedCallback();
	}

	static get styles() {
		return [style];
	}


	updated(changedProperties: Map<string, any>) {		
		if (changedProperties.has("variant")) {
				this.style.setProperty('--lwdc-header-height', this.variant == HeaderVariant.Full ? HeaderHeight.Large : HeaderHeight.Small);
				this.style.setProperty('--lwdc-header-lockup-height', this.variant == HeaderVariant.Global ? HeaderHeight.Small : HeaderHeight.Large);
		}
		if (changedProperties.has("theme")) {
			this.style.setProperty('--lwdc-header-background', themes[this.theme].background() );
			this.style.setProperty('--lwdc-header-color', themes[this.theme].color() );
			this.style.setProperty('--lwdc-header-title-chip', themes[this.theme].titleChip() );
			this.style.setProperty('--lwdc-header-box-shadow', themes[this.theme].depth.boxShadow );
			this.style.setProperty('--lwdc-header-border', themes[this.theme].depth.border );

			this.style.setProperty('--lwdc-header-link-color', themes[this.theme].linkColor() );
			this.style.setProperty('--lwdc-header-link-fadeout-color', themes[this.theme].linkFadeOutColor() );
			this.style.setProperty('--lwdc-header-current-link-color', themes[this.theme].currentLinkColor() );
			this.style.setProperty('--lwdc-header-chip-color', themes[this.theme].chipColor() );

		}
	}



	render() {

		return html`<header>
			<slot name="brand">
				<a href="#" class="brandLink">
					${this.variant == HeaderVariant.Full ? this.fullLogoTitle : this.dubLogoTitle}
				</a>
			</slot>

			<div id="children">
				${this.elementChildNodes}
			</div>


		</header>`;
		//	<slot id="children"></slot>
	}


	get fullLogoTitle() {
		let imgURL = this.imgURL;
		if (!imgURL){
			imgURL = this.theme === HeaderTheme.White
									? this.variant === HeaderVariant.Global
											? miniWdayLogoBlue
											: wdayLogoBlue
									: wdayLogoWhite;
		}

		return html`
		<div class="lockupContainer">
			<div class="lockup">
				<span class="logo">
					<img src=${imgURL}/>
				</span>
				<h3 class="logoTitle">${this.title}</h3>

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

}


//types.tsx
export enum HeaderTheme {
  White,
  Dark,
  Transparent,
}

export enum HeaderVariant {
  Dub,
  Full,
  Global,
}

export enum HeaderHeight {
  Small = '64px',
  Large = '80px',
}

export enum SearchTheme {
  Light,
  Dark,
  Transparent,
}

//themes.tsx
export interface ThemeAttributes {
  color: () => string;
	titleChip:  () => string;
  background: () => string;
  depth: any;
  systemIcon: {
    color: () => string;
    colorHover: () => string;
  };
  linkColor: () => string;
  linkFadeOutColor: () => string;
  currentLinkColor: () => string;
  chipColor: () => string;
}

export interface Themes {
  [key: string]: ThemeAttributes;
}

export const themes: Themes = {
  [HeaderTheme.White]: {
    color: ()=> colors.blackPepper400,
		titleChip: ()=> `1px solid ${colors.soap400}`,
    background: () => colors.frenchVanilla100,
    depth: depth['1'],
    systemIcon: {
      color: () => iconColors.standard,
      colorHover:  () =>iconColors.hover,
    },
    linkColor: () => colors.blackPepper400,
    linkFadeOutColor: () => colors.licorice200,
    currentLinkColor: () => colors.blueberry500,
    chipColor: () => colors.blueberry400,
  },
  [HeaderTheme.Dark]: {
    color: () => lwdcTheme.palette.primary.contrast, //colors.frenchVanilla100,
		//titleChip: ()=>`1px solid rgba(${lwdcTheme.palette.primary.main}, 0.4)`,
		titleChip: ()=>`1px solid rgba(223, 226, 230, 0.4)`,
    background: () => `linear-gradient(to bottom right, ${lwdcTheme.palette.primary.dark}, ${lwdcTheme.palette.primary.main})`,
    depth: depth['3'],
    systemIcon: {
      color: () => colors.frenchVanilla100,
      colorHover: () => colors.blueberry200,
    },
    linkColor: () => lwdcTheme.palette.primary.contrast, //colors.frenchVanilla100,
    linkFadeOutColor:  () =>chroma(lwdcTheme.palette.primary.contrast).alpha(0.5).css(),
    currentLinkColor: () => lwdcTheme.palette.primary.contrast, //colors.frenchVanilla100,
    chipColor: () => lwdcTheme.palette.primary.contrast, //colors.frenchVanilla100,
  },
  [HeaderTheme.Transparent]: {
    color: () => colors.frenchVanilla100,
		titleChip: ()=>`1px solid rgba(223, 226, 230, 0.4)`,
    background: ()=> 'transparent',
    depth: {boxShadow: 'none'},
    systemIcon: {
      color: () => colors.frenchVanilla100,
      colorHover: () => colors.blueberry200,
    },
    linkColor: () => colors.frenchVanilla100,
    linkFadeOutColor: () => chroma(colors.frenchVanilla100).alpha(0.5).css(),
    currentLinkColor: () => colors.frenchVanilla100,
    chipColor: () => colors.frenchVanilla100,
  },
};

export interface SearchThemeAttributes {
  background?: string;
  backgroundFocus?: string;
  backgroundHover?: string;
  color?: string;
  colorFocus?: string;
  placeholderColor?: string;
  placeholderColorFocus?: string;
  boxShadow?: string | string[];
  boxShadowFocus?: string | string[];
}

export interface SearchThemes {
  [key: string]: SearchThemeAttributes;
}

export const searchThemes: SearchThemes = {
  [SearchTheme.Transparent]: {
    background: 'rgba(0, 0, 0, 0)',
    backgroundFocus: 'rgba(0, 0, 0, 0)',
    color: colors.blackPepper300,
    colorFocus: colors.blackPepper300,
    placeholderColor: colors.licorice300,
    placeholderColorFocus: colors.licorice300,
    boxShadow: 'none',
    boxShadowFocus: 'none',
  },
  [SearchTheme.Light]: {
    background: colors.soap200,
    backgroundFocus: colors.soap200,
    backgroundHover: colors.soap300,
    color: colors.blackPepper300,
    placeholderColor: colors.licorice300,
    boxShadow: 'none',
    boxShadowFocus: `0 0 0 ${/*innerWidth=seperation*/0}px ${/*innerColor*/ colors.frenchVanilla100}, 0 0 0 ${/*outerWidth = width + seleration*/ 2}px ${/*outerColor*/'var(--lwdc-theme-primary-main)'}`//focusRing().boxShadow,
  },
  [SearchTheme.Dark]: {
    background: 'rgba(0, 0, 0, 0.2)',
    backgroundFocus: colors.frenchVanilla100,
    color: colors.frenchVanilla100,
    colorFocus: colors.blackPepper300,
    placeholderColor: colors.frenchVanilla100,
    placeholderColorFocus: colors.licorice300,
    boxShadow: 'none',
  },
};


//common/react/lib/parts/_brand_assets.ts
const CDN_URI = '//design.workday.com/images/';

export const dubLogoBlue = `${CDN_URI}ck-dub-logo-blue.svg`;

export const dubLogoWhite = `${CDN_URI}ck-dub-logo-white.svg`;

export const wdayLogoBlue = `${CDN_URI}ck-wday-logo-blue.svg`;

export const wdayLogoWhite = `${CDN_URI}ck-wday-logo-white.svg`;

export const miniWdayLogoBlue = `${CDN_URI}ck-mini-wday-logo-blue.svg`;


export default HeaderElement;
