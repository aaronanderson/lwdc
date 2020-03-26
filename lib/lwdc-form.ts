import { LitElement, html, css, customElement, property } from 'lit-element';
import { FormFieldLabelPosition } from './lwdc-form-field';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-form-field.scss';
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

	static get styles() {
		return [style];
	}

	connectedCallback() {
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
	}

	render() {
		let formClass = {
			'wdc-form': true,
			'wdc-form-label-position-left': (this.labelPosition == FormFieldLabelPosition.Left),
		};

		return html`
		<form class="${classMap(formClass)}"> 
			${this.elementChildNodes}
		</form>	
		`;
	}

	validate() {
		let form = this.shadowRoot!.querySelector("form") as HTMLFormElement;
		if (form) {
			//further research needed to see why custom element form validate is not triggered the same way as a native component is triggered
			for (let element of Array.from(form.elements)) {
				!element.hasAttribute('formnovalidate') && (<any>element).checkValidity && (<any>element).checkValidity();
			}

			return form.checkValidity();
		}
		return false;
	}



}


export default FormElement;







