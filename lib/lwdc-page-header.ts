import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {classMap} from  'lit/directives/class-map.js';

import styleCSS from './lwdc-page-header.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-page-header')
export class PageHeaderElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';

	@property({ type: String, attribute: "sub-title", reflect: true })
	subTitle: string = '';

	static get styles() {
		return [style];
	}

	render() {
		return html`
			 <header class="wdc-page-header">
				<div class="wdc-page-header-container">
					${this.titles}
					<div class="wdc-icon-list">
						<slot></slot>
					</div>
				</div>
			</header>

		`;
	}

	get titles() {
		if (this.subTitle) {
			return html`<div class="lwdc-page-sub-header-container">
						<h2 class="wdc-page-header-title">${this.title}</h2>
						<h3 class="lwdc-page-sub-header-title">${this.subTitle}</h3>
					</div>`;
		} else {
			return html`<h2 class="wdc-page-header-title">${this.title}</h2>`;
		}
	}

}

export default PageHeaderElement;
