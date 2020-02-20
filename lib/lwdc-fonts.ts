import { LitElement, customElement } from 'lit-element';

//Will not work in Firefox until this is addressed: https://bugzilla.mozilla.org/show_bug.cgi?id=1520690
const fonts = require('./lwdc-fonts.scss').default;
const sheet = new CSSStyleSheet() as any;
sheet.replaceSync(fonts);

@customElement('lwdc-fonts')
export class FontElement extends LitElement {

	firstUpdated() {
		loadWDCFonts();
	}



}

export const loadWDCFonts = () => {
	//Custom fonts cannot be loaded in the ShadowDOM 
	//https://blog.webf.zone/on-styling-web-components-b74b8c70c492

	const documentExt = document as any;
	documentExt.adoptedStyleSheets = !!documentExt.adoptedStyleSheets ? [...documentExt.adoptedStyleSheets, sheet] : [sheet];

	// if (!document.head.querySelector('#lwdc-fonts')) {
	// 	const fontStyleNode = document.createElement('style');
	// 	fontStyleNode.id = "lwdc-fonts";
	// 	fontStyleNode.innerHTML = fonts;
	// 	document.head.appendChild(fontStyleNode);
	// }

}


export default FontElement;






