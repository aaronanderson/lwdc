import { LitElement, html, css, customElement, property } from 'lit-element';
import { FormFieldLabelPosition } from './lwdc-form-field';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-form-field.scss';
import { formElements, formAssociatedCustomElementsSupported } from './util';
const style = css([`${styleCSS}`] as any)


/** Currently the lwdc-form-field element doesn't use the shadowDOM and instead is rendered in the lightDOM.
 * Because of this no shadowDOM styles will be imported.
 */
@customElement('lwdc-form')
export class FormElement extends LitElement {

	@property({ type: Number })
	labelPosition: FormFieldLabelPosition = FormFieldLabelPosition.Left;


	@property({ type: Array })
	elementChildNodes: Array<ChildNode> = [];


	connectedCallback() {
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
	}

	createRenderRoot() {
		return this;
	}

	static get styles() {
		return [style];
	}

	render() {
		let formClass = {
			'wdc-form': true,
			'wdc-form-label-position-left': (this.labelPosition == FormFieldLabelPosition.Left),
		};

		return html`
		<form class="${classMap(formClass)}" @submit="${(e: MouseEvent) => e.preventDefault()}">
			${this.elementChildNodes}
		</form>
		`;
	}

	validate() {
		let form = this.querySelector("form") as HTMLFormElement;
		if (form) {
			//further research needed to see why custom element form validate is not triggered the same way as a native component is triggered
			for (let element of Array.from(form.elements)) {
				!element.hasAttribute('formnovalidate') && (<any>element).checkValidity && (<any>element).checkValidity();
			}

			return form.checkValidity();
		}
		return false;
	}

	reset() {
		let form = this.querySelector("form") as HTMLFormElement;
		if (form) {
			//form.rest() works on form associated custom elements in Chrome but it is easier to
			// for (let element of Array.from(form.elements)) {
			// 	(<any>element).reset && (<any>element).reset();
			// }

			return form.reset();
		}
		return false;
	}

	item(name: string) {
		let form = this.querySelector("form") as HTMLFormElement;
		if (form) {
			if (formAssociatedCustomElementsSupported) {
				return form.elements.namedItem(name);
			} else {
				return formElements(form).find((e: Element) => (e as any).name === name);
			}
		}

	}

  radioValue(name: string) {
    let form = this.querySelector("form") as HTMLFormElement;
    let val;
		if (form) {
      let radios = form.elements[<any>name] as any;
      for (var i=0, len=radios.length; i<len; i++) {
  			 let  radio = radios[i] as HTMLInputElement;
          if ( radio.checked ) {
              val = radio.value;
              break;
          }
      }
    }
    return val;
  }



}


export default FormElement;
