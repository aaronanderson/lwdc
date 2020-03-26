import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import styleCSS from './lwdc-tabs.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-tabs')
export class TabsElement<T> extends LitElement {

	@property({ type: Object })
	theme: Theme = Theme.white;

	@property({ type: Object })
	nameSelector: TabNameSelector<T> = defaultNameSelector;

	@property({ type: Array })
	tabs: Array<T> = [];

	@property({ type: Number, attribute: true, reflect: true })
	index: number = 0;



	static get styles() {
		return [style];
	}

	firstUpdated() {
		this.fireEvent();
	}

	render() {
		let tabsClass = {
			'lwdc-white': this.theme == Theme.white,
			'lwdc-blue': this.theme == Theme.blue
		};

		return html`
			<div class="lwdc-tab-bar" role="tablist">
				<ul class="${classMap(tabsClass)}">
					${this.tabs.map((t: T, i: number) => {
			let tabClass = {				
				'current': i == this.index
			};
			return html`
				<li class="${classMap(tabClass)}" @click=${() => this.handleClick(i)}>
					<div>${this.nameSelector(t)}</div>
				</li>`;
		})}
				</ul>
			</div>
			<slot></slot>
		`;
	}

	handleClick(i: number) {
		this.index = i;
		this.fireEvent();
	}

	fireEvent() {
		this.dispatchEvent(new CustomEvent('lwdc-tab-activated', {
			detail: {
				index: this.index
			}
		}));
	}


}


const defaultNameSelector = function (value: any) {
	return value;
}



export interface TabNameSelector<T> {
	(value: T): string;
};


export enum Theme {
	white,
	blue
}

export default TabsElement;








