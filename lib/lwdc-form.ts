import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement, query} from 'lit/decorators.js';

import { FormFieldLabelPosition } from './lwdc-form-field';
import {classMap} from  'lit/directives/class-map.js';

import styleCSS from './lwdc-form-field.scss';
import { formElements, formAssociatedCustomElementsSupported } from './util';
const style = css([`${styleCSS}`] as any) as CSSResult;


/** Currently the lwdc-form-field element doesn't use the shadowDOM and instead is rendered in the lightDOM.
 * Because of this no shadowDOM styles will be imported.
 */
@customElement('lwdc-form')
export class FormElement extends LitElement {

	@property({ type: Number })
	labelPosition: FormFieldLabelPosition = FormFieldLabelPosition.Left;


	@property({ type: Array })
	elementChildNodes: Array<ChildNode> = [];

  get form(){
    return this.querySelector("form") as HTMLFormElement;
  }

  get elements(){
    let elements: Array<Element> = [];
    if (this.form){
      if (formAssociatedCustomElementsSupported) {
        elements = Array.from(this.form.elements);
      } else {
        elements = formElements(this.form);
      }
    }
    return elements.filter((e)=> !e.hasAttribute('formnovalidate'));
  }

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
		<form class=${classMap(formClass)} @submit=${(e: MouseEvent) => e.preventDefault()}>
			${this.elementChildNodes}
		</form>
		`;
	}

	validate() {
    let value = false;
		if (this.form) {
			//further research needed to see why custom element form validate is not triggered the same way as a native component is triggered
			for (let element of Array.from(this.form.elements)) {
				!element.hasAttribute('formnovalidate') && (<any>element).checkValidity && (<any>element).checkValidity();
			}
      value = this.form.checkValidity();
		}
    this.dispatchEvent(new CustomEvent(`lwdc-form-validate`, {
      detail: {
        valid: value
      }
    }));
		return value;
	}

	reset() {
		if (this.form) {
			//form.rest() works on form associated custom elements in Chrome but it is easier to
			// for (let element of Array.from(form.elements)) {
			// 	(<any>element).reset && (<any>element).reset();
			// }

			return this.form.reset();
		}
		return false;
	}

	item(name: string) {
		if (this.form) {
			if (formAssociatedCustomElementsSupported) {
				return this.form.elements.namedItem(name);
			} else {
				return formElements(this.form).find((e: Element) => (e as any).name === name);
			}
		}

	}

  radioValue(name: string) {
    let val;
		if (this.form) {
      let radios = this.form.elements[<any>name] as any;
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
