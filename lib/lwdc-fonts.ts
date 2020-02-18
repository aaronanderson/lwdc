import { LitElement, customElement } from 'lit-element';


const fonts = require('./lwdc-fonts.scss').default;

@customElement('lwdc-fonts')
export class FontElement extends LitElement {

	firstUpdated() {
		loadWDCFonts();
	}



}

export const loadWDCFonts = () => {
	//Custom fonts cannot be loaded in the ShadowDOM 
	//https://blog.webf.zone/on-styling-web-components-b74b8c70c492
	if (!document.head.querySelector('#lwdc-fonts')) {
		const fontStyleNode = document.createElement('style');
		fontStyleNode.id = "lwdc-fonts";
		fontStyleNode.innerHTML = fonts;
		document.head.appendChild(fontStyleNode);
	}

}
export default FontElement;






