import { CSSResult, Constructor } from "lit-element";
import FormFieldElement from './lwdc-form-field';


export const constructableStylesheetsSupported = ('adoptedStyleSheets' in Document.prototype) && ('replace' in CSSStyleSheet.prototype);

export const styleDocument = (styles: string, styleID: string) => {

	if (constructableStylesheetsSupported) {
		const sheet = new CSSStyleSheet() as any;
		const documentExt = document as any;
		sheet.replaceSync(styles);
		documentExt.adoptedStyleSheets = !!documentExt.adoptedStyleSheets ? [...documentExt.adoptedStyleSheets, sheet] : [sheet];
	} else {
		if (!document.head.querySelector('#' + styleID)) {
			const styleNode = document.createElement('style');
			styleNode.id = styleID;
			styleNode.innerHTML = styles;
			document.head.appendChild(styleNode);
		}
	}

}

export const styleLightDOM = (target: Element, styles: CSSResult, styleID: string) => {

	if (constructableStylesheetsSupported) {
		const rootNode = target.getRootNode() as any;
		rootNode.adoptedStyleSheets = !!rootNode.adoptedStyleSheets ? [...rootNode.adoptedStyleSheets, styles.styleSheet] : [styles.styleSheet];
	} else {
		if (!document.head.querySelector('#' + styleID)) {
			const styleNode = document.createElement('style');
			styleNode.id = styleID;
			styleNode.innerHTML = styles.cssText;
			document.head.appendChild(styleNode);
		}
	}

}


const __closestFrom = (selector: string, el: any): Element | null => {
	if (!el || el === document || el === window) return null;
	let found = el.closest(selector);
	return found ? found : __closestFrom(selector, el.getRootNode().host);
}

export const closestElement = (selector: string, base: Element) => {
	return __closestFrom(selector, base);
}


//exporting LitElement with it's private/protected members generates a 'TS4094 exported class expression may not be private or protected' error so define a limited interface
interface FormLitElement extends HTMLElement {
	connectedCallback?(): void;

}

export const formElement =
	<V, T extends Constructor<FormLitElement>>(baseElement: T) =>
		class extends baseElement {

			static formAssociated = true;

			//https://web.dev/more-capable-form-controls/#event-based-api
			//https://github.com/microsoft/TypeScript/issues/33218
			internals?: any;

			value?: V;

			constructor(...args: any[]) {
				super(args);
				this.internals = (this as any).attachInternals();
			}


			get formField() {
				return this.closest('lwdc-form-field') as FormFieldElement;
			}

			checkValidity() {
				if (this.value instanceof String && this.hasAttribute('minlength')) {
					let minLength = this.hasAttribute('required') ? 1 : 0;
					let minLengthAttr = this.getAttribute('minlength');
					minLength = minLengthAttr ? parseInt(minLengthAttr) : minLength;
					if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.value || this.value.length < minLength))) {
						if (this.formField) {
							this.internals.setValidity({ customError: true }, !this.value ? `${this.formField.label} is required` : `${minLength} characters are required`);
							this.formField.hintText = this.internals.validationMessage;
						} else {
							this.internals.setValidity({ customError: true }, !this.value ? `Required` : `${minLength} characters are required`);
						}
					} else {
						this.internals.setValidity({ customError: false }, undefined);
						if (this.formField) {
							this.formField.hintText = undefined;
						}
					}
				} else {
					if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.value))) {
						if (this.formField) {
							this.internals.setValidity({ customError: true }, `${this.formField.label} is required`);
							this.formField.hintText = this.internals.validationMessage;
						} else {
							this.internals.setValidity({ customError: true }, `Required`);
						}
					} else {
						this.internals.setValidity({ customError: false }, undefined);
						if (this.formField) {
							this.formField.hintText = undefined;
						}
					}
				}
				return this.internals.checkValidity();

			}


			lengthValidity() {

				return this.internals.checkValidity();
			}

			formResetCallback() {
				this.value = undefined;
				this.internals.setFormValue(this.value);
				this.internals.setValidity({ customError: false }, undefined);
				this.formField.hintText = undefined;
			}

		};