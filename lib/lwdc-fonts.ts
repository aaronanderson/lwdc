import { LitElement, customElement } from 'lit-element';

import { styleDocument } from './util';
//Will not work in Firefox until this is addressed: https://bugzilla.mozilla.org/show_bug.cgi?id=1520690
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
	styleDocument(fonts, 'lwdc-fonts');
}


export default FontElement;






