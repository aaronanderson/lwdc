import { CSSResult, Constructor, LitElement } from "lit-element";
import FormFieldElement from './lwdc-form-field';
import FormElement from "./lwdc-form";


export const formAssociatedCustomElementsSupported = 'ElementInternals' in window && 'setFormData' in (window as any).ElementInternals;

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

	const rootNode = target.getRootNode() as any;
	if (constructableStylesheetsSupported) {
		rootNode.adoptedStyleSheets = !!rootNode.adoptedStyleSheets ? [...rootNode.adoptedStyleSheets, styles.styleSheet] : [styles.styleSheet];
	} else {
		if (rootNode === document){
			if (!document.head.querySelector('#' + styleID)) {
				const styleNode = document.createElement('style');
				styleNode.id = styleID;
				styleNode.innerHTML = styles.cssText;
				document.head.appendChild(styleNode);
			}
		} else if (rootNode instanceof ShadowRoot){
			let shadowRoot = rootNode as ShadowRoot;
			if (!shadowRoot.querySelector('#' + styleID)) {
				const styleNode = document.createElement('style');
				styleNode.id = styleID;
				styleNode.innerHTML = styles.cssText;
				shadowRoot.appendChild(styleNode);
			}
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

//Ensure server sends the following HTTP headers:
//Content-Disposition: attachment;filename="somefilename.txt"
//Access-Control-Expose-Headers: Content-Disposition
export const fileDownload = async (endpoint: string, fileName?: string) => {
	const response: Response = await fetch(endpoint, {
		method: 'GET'
	});

	if (response.ok) {

		if (!fileName) {
			let dispositionHeader = response.headers.get("content-disposition");
			if (dispositionHeader) {
				let fileNameRegEx = dispositionHeader.match("attachment;filename=\"(.*)\"");
				if (fileNameRegEx) {
					fileName = fileNameRegEx[1];
				}
			}
		}
		if (!fileName) {
			throw new DownloadError('Filename is unavailable', response);
		}

		const result = await response.blob();

		let link = document.createElement('a');
		link.download = fileName;
		link.href = URL.createObjectURL(result);
		link.click();
		URL.revokeObjectURL(link.href);
	} else {
		throw new DownloadError('Service is unavailable', response);
	}


}

export class DownloadError extends Error {

	response: Response;

	constructor(message: string, response: Response) {
		super(message);
		this.response = response;
	}
}

export const pathValue = (obj: any, path: string) => {
    return path.split(/(\[|\]|\.)/).reduce(function (x, y) {
        return ('[].'.indexOf(y) > -1) ? x : (x === Object(x) && y in x) ? x[y] : undefined;
    }, obj)
}
//For Firefox. Mininimal form associated custom element support for only functions used by this library that are supported in Chrome.
//Form associated custom elements are not necessary since checkValidity logic below manages the Canvas Kit form-field hintText values that are displayed in the UI.
//However plugging into the browser's HTML form lifecycle management is a standards compliant approach and may provide additional benefits in the futures.
export const formAssociatedElementPolyfill = (element: HTMLElement) => {

	// if (!HTMLElement.prototype.attachInternals) {
	// 	HTMLElement.prototype.attachInternals = () => {
	if (!formAssociatedCustomElementsSupported) {

		element.attachInternals = function () {

			const ElementInternals = class {

				isValid: boolean = true;
				validationMessage?: string;

				checkValidity() { return this.isValid; }

				reportValidity() { return this.isValid; }

				setFormValue(value: any, state?: any): void { }

				setValidity(flags: any, message?: string, anchor?: HTMLElement): void {
					this.isValid = !flags.customError;
					this.validationMessage = message;
				}

			};
			return new ElementInternals();
		};

		//const origFormElements = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'elements')!.get;
		//const origFormCheckValidity = HTMLFormElement.prototype.checkValidity;
		//const origFormReset = HTMLFormElement.prototype.reset;




		//decided not to polyfill elements. It is a core feature of HTML forms and not really new functionality to be polyfilled.
		/*

		const elementHandler = {
			get: function (target: any, key: any, receiver: any) {
				console.log('proxy', target, key, receiver);
			}
		};

		Object.defineProperty(HTMLFormElement.prototype, "elements", {
			get: function elements() {
				if (origFormElements) {
					console.log('elements', origFormElements.call(this));
					//new Proxy(origElements,handler);
					return origFormElements.call(this);
				}
			}
		});

		*/


		HTMLFormElement.prototype.checkValidity = function () {
			let valid = true;
			for (let element of formElements(this)) {
				if (!element.hasAttribute('formnovalidate') && (<any>element).checkValidity) {
					let elementValid = (<any>element).checkValidity();
					valid = valid && elementValid;
				}
			}
			return valid;// && origFormCheckValidity.call(this);
		}

		HTMLFormElement.prototype.reset = function () {
			for (let element of formElements(this)) {
				if ((<any>element).formResetCallback) {
					(<any>element).formResetCallback();
				}
			}
			//origFormReset.call(this);
		}
	}
}

export const formElements = (form: HTMLFormElement): Array<Element> => {
	return Array.from(form.querySelectorAll("*")).filter((n: Element) => {
		const el = n as any;
		return el.constructor.formAssociated || el.form;
	});

}

//exporting LitElement with it's private/protected members generates a 'TS4094 exported class expression may not be private or protected' error so define a limited interface
interface FormLitElement extends HTMLElement {
	connectedCallback?(): void;

}

export const formElement =
	<T extends Constructor<FormLitElement>>(baseElement: T) =>
		class extends baseElement {

			static formAssociated = true;

			//https://web.dev/more-capable-form-controls/#event-based-api
			//https://github.com/microsoft/TypeScript/issues/33218
			_internals?: any;

			value?: string | File | FormData;

			_customValidity = "";

			constructor(...args: any[]) {
				super(args);
				formAssociatedElementPolyfill(this);
				this._internals = (this as any).attachInternals();
			}

			//standard form associated fields
			get form() { return this._internals.form; }
			get name() { return this.getAttribute('name'); }
			get type() { return this.localName; }
			get validity() { return this._internals.validity; }
			get validationMessage() { return this._internals.validationMessage; }
			get willValidate() { return this._internals.willValidate; }

			//checkValidity() { return this.internals.checkValidity(); }
			reportValidity() { return this._internals.reportValidity(); }

			// formAssociatedCallback(form: FormElement) { }
			// formDisabledCallback(disabled: boolean) { }
			// formStateRestoreCallback(state: string | File | FormData, mode: string) { }//mode =  restore or autocomplete


			get formField() {
				return this.closest('lwdc-form-field') as FormFieldElement;
			}

			checkValidity() {
				if (this._customValidity) {
					return false;
				}
				if (this.hasAttribute('minlength') && this.value instanceof String) {
					let minLength = this.hasAttribute('required') ? 1 : 0;
					let minLengthAttr = this.getAttribute('minlength');
					minLength = minLengthAttr ? parseInt(minLengthAttr) : minLength;
					if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.value || this.value.length < minLength))) {
						let message = this.formField ? `${this.formField.label} is required` : 'Required';
						this.setInternals(true, () => !this.value ? message : `${minLength} characters are required`);
					} else {
						this.setInternals(false);
					}
				} else if (!this.matches(':disabled') && (this.hasAttribute('required') && (!this.value))) {
					let message = this.formField ? `${this.formField.label} is required` : 'Required';
					this.setInternals(true, () => message);
				} else {
					this.setInternals(false);
				}
				return this._internals.checkValidity();

			}

			setCustomValidity(customValidity: string) {
				this._customValidity = customValidity;
				if (customValidity) {
					this.setInternals(true, () => customValidity);
				} else {
					this.setInternals(false);
				}
			}

			setInternals(isError: boolean, formMessage?: Function) {
				if (isError) {
					if (this.formField && formMessage) {
						this._internals.setValidity({ customError: true }, formMessage.call(this));
						this.formField.hintText = this._internals.validationMessage;
					} else {
						this._internals.setValidity({ customError: true }, `Required`);
					}
				} else {
					this._internals.setValidity({ customError: false }, undefined);
					if (this.formField) {
						this.formField.hintText = undefined;
					}
				}
			}


			formResetCallback() {
				this._internals.setValidity({ customError: false }, undefined);
				this.formField.hintText = undefined;
				this.value = '';
				this._internals.setFormValue(undefined);
				// if (this instanceof LitElement) {
				// 	this.requestUpdate();
				// }
			}

		};
