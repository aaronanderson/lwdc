import { LitElement, html, css, customElement, property } from 'lit-element';

const style = css(<any>[require('./lwdc-form-field.scss').default]);

/** Currently the lwdc-form-field element doesn't use the shadowDOM and instead is rendered in the lightDOM.
 * Because of this no shadowDOM styles will be imported. 
 */
@customElement('lwdc-form')
export class FormElement extends LitElement {

	@property({ type: Array })
	elementChildren: Array<Element> = [];

	static get styles() {
		return [style];
	}

	connectedCallback() {
		this.elementChildren = Array.from(this.children);
		super.connectedCallback();
	}

	render() {
		return html`
		<form class="wdc-form"> 
			${this.elementChildren}
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







