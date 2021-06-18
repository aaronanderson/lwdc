/* eslint-disable import/extensions */
import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {html as html2} from 'lit-html';

import { withKnobs, text, boolean, radios, number } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

import {getLastPage, getVisibleResultsMin, getVisibleResultsMax} from '../lib/lwdc-pagination';
import '../lib/lwdc-pagination';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');

const jumpControlsBox = () => boolean("Jump Controls", true);

const rangeSizeBox = () => number("Range Size", 5);

const additionalDataBox = () => boolean("Show Additional Data", false);

const gotoBox = () => boolean("Show GoTo", false);




export const paginationStory = () => {
	return html2`<lwdc-pagination-example ?jumpControls=${jumpControlsBox()} ?showAdditionalData=${additionalDataBox()} ?showGoToLabel=${gotoBox()} rangeSize=${rangeSizeBox()}></lwdc-pagination-example>`;

}

paginationStory.storyName = 'Pagination';
paginationStory.parameters = { layout: 'centered' };
paginationStory.component = 'lwdc-pagination';
paginationStory.decorators= [withKnobs];




@customElement('lwdc-pagination-example')
class PaginationElement extends LitElement {

	@property({ type: Number })
	currentPage = 1;

	@property({ type: Number })
	resultCount = 10;

	@property({ type: Number })
	totalCount = 100;

	@property({ type: Boolean })
  jumpControls: boolean = false;

	@property({ type: Boolean})
	showGoToLabel = false;

	@property({ type: Object})
	gotoLabel: () => TemplateResult = () => html `of ${this.totalCount} results`;

	@property({ type: Boolean})
	showAdditionalData = false;

	@property({ type: Object})
	additionalDetails: (element: PaginationElement) => TemplateResult = (element: PaginationElement) => html  `${getVisibleResultsMin(element.currentPage, this.resultCount)}-${getVisibleResultsMax(element.currentPage, this.resultCount,  this.totalCount)} of ${this.totalCount} results`;

	@property({ type: Number, attribute: true, reflect: true })
	rangeSize: number = 5;

	@property({ type: Number })
	lastPage = getLastPage(this.resultCount, this.totalCount);

	additionalDetails



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
		<lwdc-pagination ?jumpControls=${this.jumpControls} .additionalDetails=${this.showAdditionalData? this.additionalDetails: undefined} .gotoLabel=${this.showGoToLabel? this.gotoLabel: undefined} rangeSize=${this.rangeSize} lastPage=${this.lastPage}  @lwdc-pagination-page-change=${(e)=> {console.log('page change', this.currentPage, e.detail.page); this.currentPage = e.detail.page;  }}></lwdc-pagination>`;//
	}


}
