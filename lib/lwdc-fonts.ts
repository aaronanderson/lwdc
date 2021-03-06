import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';


import { styleDocument } from './util';
//Will not work in Firefox until this is addressed: https://bugzilla.mozilla.org/show_bug.cgi?id=1520690
import fonts from './lwdc-fonts.scss';


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


export default { loadWDCFonts, FontElement };






