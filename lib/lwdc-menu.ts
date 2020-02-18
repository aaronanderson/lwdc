import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap, StyleInfo } from 'lit-html/directives/style-map';
import FormFieldElement from './lwdc-form-field';


const style = css(<any>[require('./lwdc-menu.scss').default]);


@customElement('lwdc-menu')
export class MenuElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	width?: string | undefined;

	@property({ type: Boolean, attribute: true, reflect: true })
	grow = false;

	//TODO investigate how Canvas Kit CSS could be modified to handle menu item slots/parts fully in the ShadowDOM 
	@property({ type: Array })
	elementChildren: Array<Element> = [];


	connectedCallback() {
		//Maybe need a mutation observer here in case child menu items change
		this.elementChildren = Array.from(this.children);
		super.connectedCallback();
	}

	static get styles() {
		return [style];
	}

	render() {		
		let classes = {
			'wdc-menu': true,
			'wdc-menu-grow': this.grow
		}

		let style = <StyleInfo>{ width: this.width };

		return html`
		<div class="${classMap(classes)}" role="menu" aria-label="Menu" style="${styleMap(this.width ? style : {})}">
			<ul>
				 ${this.elementChildren}
			</ul>
		</div>
		 
		`;
	}



}


export default { MenuElement }








