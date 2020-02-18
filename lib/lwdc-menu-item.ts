import { LitElement, html, css, customElement, property } from 'lit-element';
import { CanvasIcon } from '@workday/design-assets-types';
import { classMap } from 'lit-html/directives/class-map';

const style = css(<any>[require('./lwdc-menu-item.scss').default]);

@customElement('lwdc-menu-item')
export class MenuItemElement extends LitElement {

	@property({ type: Object })
	icon?: CanvasIcon;

	@property({ type: Object })
	secondaryIcon?: CanvasIcon;

	@property({ type: Boolean, attribute: true, reflect: true })
	selected = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused = false;

	elementChildNodes: Array<ChildNode> = [];


	connectedCallback() {
		this.elementChildNodes = Array.from(this.childNodes);
		super.connectedCallback();
	}

	//for now render in the lightDOM until descendant selector across shadowDOMs is sorted out. 
	createRenderRoot() {
		return this;
	}

	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
		// this.addEventListener('focus', (e: Event) => { this.focused = true; });
		// this.addEventListener('blur', (e: Event) => {
		// 	this.focused = false;
		// 	console.log("blur", e, e.target);
		// });

	}


	static get styles() {
		return [style];
	}



	render() {		
		let classes = {
			'wdc-menu-item-disabled': this.disabled,
			'wdc-menu-item-focused': this.selected,
		}

		

		return html`		
		<li role="menuitem" class=${classMap(classes)}>
			${this.icon ? html`<lwdc-icon .icon=${this.icon} class="wdc-menu-item-icon"></lwdc-icon>` : null}		
			${this.childNodes ? html`<span class="wdc-menu-item-label">${this.elementChildNodes}</span>` : html`${this.elementChildNodes}`}
			${this.secondaryIcon ? html`<lwdc-icon .icon=${this.secondaryIcon} class="wdc-menu-item-icon"></lwdc-icon>` : null}			
		</li>
		
		`;
	}

	updated(changedProperties: Map<string, any>) {		
		if (changedProperties.has("selected") && !this.selected && this.focused) {
			console.log("updated", this.selected, this.focused);
			//this.blur(); //blur bubbles up even though it is not supposed to.
			this.parentElement!.focus();




		}

	}




}

export default { MenuItemElement }








