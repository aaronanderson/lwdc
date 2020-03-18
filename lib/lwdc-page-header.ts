import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const style = css(<any>[require('./lwdc-page-header.scss').default]);

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








