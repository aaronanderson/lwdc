import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {classMap} from  'lit/directives/class-map.js';

import styleCSS from './lwdc-tabs.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


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

	@property({ type: Number, attribute: true, reflect: true })
	nextIndex: number = -1;


	static get styles() {
		return [style];
	}

	firstUpdated() {
		this.fireEvent();
	}

	render() {
		let tabsClass = {
			'lwdc-white': this.theme == Theme.white,
			'lwdc-dark': this.theme == Theme.dark
		};

		return html`
			<div class="lwdc-tab-bar" role="tablist">
				<ul class=${classMap(tabsClass)}>
					${this.tabs.map((t: T, i: number) => {
			let tabClass = {
				'current': i == this.index,
				'next': i == this.nextIndex
			};
			return html`
				<li class=${classMap(tabClass)} @click=${() => this.handleTab(i)}>
					<div id="tab-${i}" tabIndex=${i} @keydown=${this.onKeyDown}>${this.nameSelector(t)}</div>
				</li>`;
				})}
				</ul>
			</div>
			<slot></slot>
		`;
	}

	handleTab(i: number) {
		this.index = i;
		this.nextIndex = -1;
		this.fireEvent();
	}

	fireEvent() {
		this.dispatchEvent(new CustomEvent('lwdc-tab-activated', {
			detail: {
				index: this.index,
				tab: this.tabs.length > 0 ? this.tabs[this.index]: undefined
			}
		}));
	}


	onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowLeft':
			case 'Left':
				this.setIntentTab('previous');
				break;
			case 'ArrowRight':
			case 'Right':
				this.setIntentTab('next');
				break;
			case 'Home':
				this.setIntentTab('first');
				break;
			case 'End':
				this.setIntentTab('last');
				break;
			case 'Enter':
			case ' ':
				this.handleTab(this.nextIndex);
				event.preventDefault();
				break;
			default:
				break;
		}
	}


	setIntentTab(value: 'first' | 'last' | 'next' | 'previous') {
		this.nextIndex = this.nextIndex == -1 ? this.index: this.nextIndex;
		if (value === 'first') {
			this.nextIndex = 0;
		} else if (value === 'last') {
			this.nextIndex = this.tabs.length - 1;
		} else {
			this.nextIndex = this.nextIndex  +	(value === 'next' ? 1 : -1);
			if (this.nextIndex < 0) {
				this.nextIndex = this.tabs.length - 1;
			} else if (this.nextIndex >= this.tabs.length) {
				this.nextIndex = 0;
			}
		}
		//let element = this.shadowRoot?.querySelector(`#tab-${this.nextIndex}`) as HTMLDivElement;
		//element.focus();

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
	dark
}

export default TabsElement;
