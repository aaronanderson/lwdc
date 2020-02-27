import { CSSResult } from "lit-element";


export const constructableStylesheetsSupported = ('adoptedStyleSheets' in Document.prototype) && ('replace' in CSSStyleSheet.prototype);

export const styleDocument = (styles: string, styleID: string) => {

	if (constructableStylesheetsSupported) {
		const sheet = new CSSStyleSheet() as any;
		const documentExt = document as any;
		sheet.replaceSync(styles);
		documentExt.adoptedStyleSheets = !!documentExt.adoptedStyleSheets ? [...documentExt.adoptedStyleSheets, sheet] : [sheet];
	} else {
		if (!document.head.querySelector('#' + styleID)) {
			const fontStyleNode = document.createElement('style');
			fontStyleNode.id = styleID;
			fontStyleNode.innerHTML = styles;
			document.head.appendChild(fontStyleNode);
		}
	}

}

export const styleLightDOM = (target: Element, styles: CSSResult, styleID: string) => {

	if (constructableStylesheetsSupported) {
		const rootNode = target.getRootNode() as any;
		rootNode.adoptedStyleSheets = !!rootNode.adoptedStyleSheets ? [...rootNode.adoptedStyleSheets, styles.styleSheet] : [styles.styleSheet];
	} else {
		if (!document.head.querySelector('#' + styleID)) {
			const fontStyleNode = document.createElement('style');
			fontStyleNode.id = styleID;
			fontStyleNode.innerHTML = styles.cssText;
			document.head.appendChild(fontStyleNode);
		}
	}

}