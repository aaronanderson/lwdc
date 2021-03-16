import { LitElement, TemplateResult, html, css, customElement, property, query } from 'lit-element';

import {  ButtonType, ButtonSize } from './lwdc-button';
import './lwdc-button';
import './lwdc-text';
import {TextElement} from './lwdc-text';
import { closestElement } from './util';

import range from 'lodash/range';

import { chevron2xLeftSmallIcon, chevronLeftSmallIcon, chevronRightSmallIcon, chevron2xRightSmallIcon } from '@workday/canvas-system-icons-web';

import styleCSS from './lwdc-pagination.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-pagination')
export class PaginationElement extends LitElement {

  @property({ type: Number, attribute: true, reflect: true })
	lastPage: number = 1;

	@property({ type: Number, attribute: true, reflect: true })
  firstPage: number = 1;

  @property({ type: Number, attribute: true, reflect: true })
  rangeSize: number = 5;

	@property({ type: Number, attribute: true, reflect: true })
  currentPage: number = 1;

  @property({ type: Boolean, attribute: true, reflect: true })
  jumpControls: boolean = true;

	@property({ type: Object })
  gotoLabel?: () => TemplateResult;

	@property({ type: Object })
  additionalDetails?: (element: PaginationElement) => TemplateResult;


	static get styles() {
		return [style];
	}

	render() {

    const range = buildPageRange(this.currentPage, this.lastPage, this.rangeSize);
    const rangeMin = getRangeMin(range);
    const rangeMax = getRangeMax(range);

		return html`
		<nav class="lwdc-pagination-container">
      		<div class="lwdc-pagination-content-container">
              ${this.jumpControls? html `<lwdc-button .type=${ButtonType.iconSquare} .size=${ButtonSize.small} @click=${() => this.pageChange(this.firstPage)} ?disabled=${this.currentPage <= this.firstPage}>
                <lwdc-icon .icon=${chevron2xLeftSmallIcon}></lwdc-icon>
              </lwdc-button>`: undefined}
              <lwdc-button .type=${ButtonType.iconSquare} .size=${ButtonSize.small} @click=${() => this.pageChange(this.currentPage - 1)} ?disabled=${this.currentPage <= this.firstPage}>
                <lwdc-icon .icon=${chevronLeftSmallIcon}></lwdc-icon>
              </lwdc-button>

              <ol role="list" class="lwdc-pagination-page-list">
                    ${range.map(this.pageToButton.bind(this))}
              </ol>


              <lwdc-button .type=${ButtonType.iconSquare} .size=${ButtonSize.small} @click=${() => this.pageChange(this.currentPage + 1)} ?disabled=${this.currentPage >= this.lastPage}>
                <lwdc-icon .icon=${chevronRightSmallIcon}></lwdc-icon>
              </lwdc-button>
              ${this.jumpControls? html `<lwdc-button .type=${ButtonType.iconSquare} .size=${ButtonSize.small} @click=${() => this.pageChange(this.lastPage)} ?disabled=${this.currentPage >= this.lastPage}>
                <lwdc-icon .icon=${chevron2xRightSmallIcon}></lwdc-icon>
              </lwdc-button>`: undefined}
              ${this.gotoLabel ? html `<lwdc-pagination-goto .max=${this.lastPage} .gotoLabel=${this.gotoLabel}></lwdc-pagination-goto>`: undefined}
          </div>
          ${this.additionalDetails ? html `<div class="lwdc-pagination-details">${this.additionalDetails(this)}</div>`: undefined}
		</nav>
		`;
	}

  pageToButton(page: number){
    let pagination = closestElement('lwdc-pagination', this) as PaginationElement;
    let buttonType = page === this.currentPage ? ButtonType.iconSquareFilled : ButtonType.iconSquare;
    return html `
    <li class="lwdc-pagination-page-list-item">
      <lwdc-button ?page-selected=${page === this.currentPage} .type=${buttonType} .size=${ButtonSize.small} @click=${() => pagination.pageChange(page)}>
      ${page}
      </lwdc-button>
    </li>`;
  }

  pageChange(page: number){
    this.currentPage = page;
    let event = new CustomEvent('lwdc-pagination-page-change', {
      detail: {
        page: page
      }
    });
    this.dispatchEvent(event);
  }

}


@customElement('lwdc-pagination-goto')
export class PaginationGoToElement extends LitElement {

  @property({ type: Number, attribute: true, reflect: true })
  max=0;

  @property({ type: Object })
  gotoLabel: () => TemplateResult = () => html ``;

  @query('lwdc-text')
  textInput?: TextElement;

  createRenderRoot() {
    return this;
  }

  validatePage(text: string){
    const textAsInteger = parseInt(text, 10);
    if (textAsInteger < 1) {
      return 0;
    }
    if (textAsInteger > this.max) {
      return 0;
    }
    return textAsInteger;
  }

  formSubmit(e: any) {
    e.preventDefault();
    const page = this.validatePage(this.textInput && this.textInput.value ? this.textInput.value: '');
    if (page) {
        let pagination = closestElement('lwdc-pagination', this) as PaginationElement;
        pagination.pageChange(page);
    }
  };

  render() {
    return html `  <form class="lwdc-pagination-goto" @submit=${this.formSubmit}>
                    		<lwdc-text name="goto" inputType="number" min=${1} max=${this.max}></lwdc-text>
                        <label class="lwdc-pagination-goto-label">${this.gotoLabel()}</label>
                  </form>
                `;
  }
}

//modules/_labs/pagination/react/lib/Pagination/common/utils/helpers.ts
export function getLastPage(resultCount: number, totalCount: number): number {
  return Math.ceil(totalCount / resultCount);
}

export function getRangeMin(range: number[]): number {
  return range[0];
}

export function getRangeMax(range: number[]): number {
  return range[range.length - 1];
}

export function getVisibleResultsMin(currentPage: number, resultCount: number): number {
  return currentPage * resultCount - resultCount + 1;
}

export function getVisibleResultsMax(
  currentPage: number,
  resultCount: number,
  totalCount: number
): number {
  if (totalCount < currentPage * resultCount) {
    return totalCount;
  }
  return currentPage * resultCount;
}


//modules/_labs/pagination/react/lib/Pagination/buildPageRange.ts
const buildRange = (max: number, min: number): number[] => {
  // `max` determines the size of the range, and `min + index` determines its values
  return [...Array(max)].map((_, index) => min + index);
};


export const buildPageRange = (currentPage: number, lastPage: number, rangeSize: number) => {
  // prevent the range size exceeding the number of pages
  const adjustedRangeSize = lastPage < rangeSize ? lastPage : rangeSize;

  // Prevent the range from going below 1
  if (currentPage <= Math.floor(rangeSize / 2)) {
    const rangeMin = 1;
    return buildRange(adjustedRangeSize, rangeMin);
  }
  // Prevent the range from going above the lastPage
  if (currentPage + Math.floor(adjustedRangeSize / 2) > lastPage) {
    const rangeMin = lastPage - adjustedRangeSize + 1;
    return buildRange(adjustedRangeSize, rangeMin);
  }

  const rangeMin = currentPage - Math.floor(adjustedRangeSize / 2);
  return buildRange(adjustedRangeSize, rangeMin);
};



export default {PaginationElement, PaginationGoToElement};
