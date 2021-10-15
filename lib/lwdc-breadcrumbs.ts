import {LitElement, CSSResult, html, css, TemplateResult} from 'lit';
import {property, state, customElement, queryAll, query} from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { createRef, ref } from 'lit/directives/ref.js';

import {classMap} from  'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { chevronRightSmallIcon, relatedActionsIcon } from '@workday/canvas-system-icons-web';

import './lwdc-button';
import { ButtonType } from './lwdc-button';

import styleCSS from './lwdc-breadcrumbs.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-breadcrumbs')
export class BreadcrumbsElement<T> extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	collapsible = false;

	@property({ type: Array })
	links: Array<T> = [];

	@property({ type: String, attribute: true, reflect: true })
	current?: string;

	@property({ type: Object })
	valueSelector: Function = defaultSelector;

	@state()
	showMenu = false;

	@query("lwdc-menu")
	collapsedMenu?: HTMLElement;

	constructor() {
		super();
		this.addEventListener('blur', (e) => {this.showMenu = false; this.resetCollapsedMenu();});
	  }


	static get styles() {
		return [style];
	}

	render() {
		return html `
			<nav role="navigation" aria-label="Breadcrumb">
				<ul role="list" class="lwdc-breadcrumbs-list">
					${this.collapsible? this.collapsibleTemplate: this.defaultTemplate}
				</ul>
			</nav>
		`;
	}

	get collapsibleTemplate(){
		const breadcrumbs: Array<TemplateResult> = [];
		if (this.links.length ==1){
			const l = this.links[0];
			breadcrumbs.push(html `<li class="lwdc-breadcrumbs-list-item">${this.currentTemplate(l)}</li>`);
		} else if (this.links.length ==2){
			let l = this.links[0];
			breadcrumbs.push(html `<li class="lwdc-breadcrumbs-list-item">
										${this.linkTemplate(l)}
										<lwdc-icon .icon=${chevronRightSmallIcon}></lwdc-icon>
									</li>`);
			l = this.links[1];									
			breadcrumbs.push(html `<li class="lwdc-breadcrumbs-list-item">${this.currentTemplate(l)}</li>`);
		} else {
			let l = this.links[0];
			breadcrumbs.push(html `<li class="lwdc-breadcrumbs-list-item">
										${this.linkTemplate(l)}
										<lwdc-icon .icon=${chevronRightSmallIcon}></lwdc-icon>
									</li>`);									
			breadcrumbs.push(html `<li class="lwdc-breadcrumbs-list-item">
										<lwdc-button .type=${ButtonType.iconSquare} @click=${(e: MouseEvent)=> this.showMenu = !this.showMenu}><lwdc-icon .icon=${relatedActionsIcon}></lwd-icon></lwdc-button>
										<lwdc-menu style=${styleMap({display: this.showMenu? 'block': 'none'})}>
											${repeat(this.links.slice(1, this.links.length-1), (l: T, index: number) => html `<lwdc-menu-item @click=${(e: MouseEvent)=> this.handleSelect(l,e)}>${this.valueSelector(LinkValueType.name, l)}</lwdc-menu-item>`)}											
										</lwdc-menu>
										<lwdc-icon .icon=${chevronRightSmallIcon}></lwdc-icon>
									</li>`);
			l = this.links[this.links.length-1];									
			breadcrumbs.push(html `<li class="lwdc-breadcrumbs-list-item">${this.currentTemplate(l)}</li>`);
		}
		return breadcrumbs;
	}

	linkTemplate(l: T){
		return html `<a style=${this.maxWidthStyle(l)} class="lwdc-breadcrumbs-link" href="${this.valueSelector(LinkValueType.href, l)}" role="link" @click=${(e: MouseEvent)=> this.handleClick(l,e)}>${this.valueSelector(LinkValueType.name, l)}</a>`;
	}

	currentTemplate(l: T){
		return html `<span style=${this.maxWidthStyle(l)} class="lwdc-breadcrumbs-current">${this.valueSelector(LinkValueType.name, l)}</span>`;
	}

	handleClick(l: T, e: MouseEvent) {				
		e.preventDefault();
		this.dispatchEvent(new CustomEvent(`lwdc-breadcrumb-link`, {
			detail: {
				link: l
			}
		}));
  	}

	handleSelect(l: T, e: MouseEvent) {				
		if (e.target){
			const target = e.currentTarget as HTMLElement;
			this.resetCollapsedMenu();
			target.setAttribute("selected", "");
		}
		this.dispatchEvent(new CustomEvent(`lwdc-breadcrumb-link`, {
			detail: {
				link: l
			}
		}));
  	}

	resetCollapsedMenu()  {
		if (this.collapsible && this.collapsedMenu){
			this.collapsedMenu.querySelectorAll('lwdc-menu-item').forEach((e)=> e.removeAttribute("selected"));
		}
	}

	get defaultTemplate(){
		const currentIndex = this.current? Number(this.current): this.links.length-1;
		return repeat(this.links, (l: T)=> l, (l: T, index: number) => {			
			const isCurrent = index == currentIndex;			
			return html `					
			<li class="lwdc-breadcrumbs-list-item">
				${isCurrent? 
					this.currentTemplate(l): 
					html `${this.linkTemplate(l)}`}
					${index < this.links.length-1? html `<lwdc-icon .icon=${chevronRightSmallIcon}></lwdc-icon>`: undefined} 						
			</li>
		
		
		`});
	}

	

	maxWidthStyle(l : T): any{
		const maxWidth = this.valueSelector(LinkValueType.maxWidth, l);			
		return styleMap({
			'--lwdc-breadcrumb-width': maxWidth? `${maxWidth}px`: undefined
		});	
	}

}

export enum LinkValueType {
	name,
	href,
	maxWidth	
}


export const defaultSelector = function (type: LinkValueType, value: any): string {
	return value[LinkValueType[type]];
}

export default BreadcrumbsElement;


