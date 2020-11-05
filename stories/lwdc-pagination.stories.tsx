/* eslint-disable import/extensions */
import { LitElement, html, css, customElement, property } from 'lit-element';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

import '../lib/lwdc-pagination';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-pagination',
	decorators: [withKnobs]
};

const mobileBox = () => boolean("Mobile", false);

const labelBox = () => boolean("Show Label", false);

const gotoBox = () => boolean("Show Go To", false);

export const paginationStory = () => {
	return html`<lwdc-pagination-example ?showLabel=${ labelBox()} ?showGoTo=${gotoBox()}  .width=${mobileBox()?450:700}></lwdc-pagination-example>`;

}

paginationStory.storyName = 'Pagination';
paginationStory.parameters = { layout: 'centered' };



@customElement('lwdc-pagination-example')
class PaginationElement extends LitElement {

	@property({ type: Number })
	width = 800;

	@property({ type: Number })
	currentPage = 1;

	@property({ type: Number })
	total = 50;

	@property({ type: Boolean })
	showLabel = false;

	@property({ type: Boolean })
	showGoTo = false;

	static get styles() {
		return css `:host{text-align: center}`;
	}

	customLabel(from: number, to: number, items: number){
		return html `${from.toLocaleString()}\u2013${to.toLocaleString()} of ${items.toLocaleString()} ${
              items > 1 ? 'candidates' : 'candidate'
            }`;
	}

	render() { //.customLabel=${this.customLabel}
		return html`
		<h4>
			Current Page: <span data-testid="pageNumber">${this.currentPage}</span>
		</h4>
		<lwdc-pagination ?showLabel=${ this.showLabel} ?showGoTo=${this.showGoTo} width=${this.width} total=${this.total} pageSize=${10} currentPage=${this.currentPage} @lwdc-pagination-page-change=${(e)=> {console.log('page change', this.currentPage, e.detail.page); this.currentPage = e.detail.page;  }}></lwdc-pagination>`;//
	}


}
