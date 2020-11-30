import { LitElement, html, css, customElement, property, query } from 'lit-element';

import {  ButtonType, ButtonSize } from './lwdc-button';
import './lwdc-button';
import './lwdc-text';
import {TextElement} from './lwdc-text';
import { closestElement } from './util';

import range from 'lodash/range';

import { chevronLeftSmallIcon, chevronRightSmallIcon } from '@workday/canvas-system-icons-web';

import styleCSS from './lwdc-pagination.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-pagination')
export class PaginationElement extends LitElement {

  @property({ type: Number, attribute: true, reflect: true })
	total: number = 0;

	@property({ type: Number, attribute: true, reflect: true })
  pageSize: number = 0;

	@property({ type: Number, attribute: true, reflect: true })
  currentPage: number = 0;

	@property({ type: Boolean, attribute: true, reflect: true })
  showGoTo= false;

	@property({ type: Boolean, attribute: true, reflect: true })
  showLabel= false;

	@property({ type: Object })
  customLabel: (from: number, to: number, total: number) => string =  this.defaultCustomLabel;

	@property({ type: Boolean, attribute: true, reflect: true })
  goToLabel: string = "Go To";

  @property({ type: String})
  paginationContainerAriaLabel?: string;

  @property({ type: String})
  previousPageAriaLabel?: string;

  @property({ type: String})
  nextPageAriaLabel?: string;

  @property({ type: Object})
  pageButtonAriaLabel?: (page: number, selected: boolean) => string;

  @property({ type: Number, attribute: true, reflect: true })
  width?: number;



	static get styles() {
		return [style];
	}

	render() {
    const numPages = Math.ceil(this.total / this.pageSize);
    const isMobile = this.width ? this.width < 500 : false;

    const labelFrom = (this.currentPage - 1) * this.pageSize + 1;
    const labelTo = this.currentPage * this.pageSize >= this.total ? this.total : this.currentPage * this.pageSize;

		return html`
		<nav class="wdc-pagination-container">
      		<div class="wdc-pagination-button-container">
            	<lwdc-button .type=${ButtonType.iconSquare} .size=${ButtonSize.small} @click=${() => this.pageChange(this.currentPage - 1)} ?disabled=${this.currentPage - 1 <= 0}>
                <lwdc-icon .icon=${chevronLeftSmallIcon}></lwdc-icon>
              </lwdc-button>

              <lwdc-pagination-pages ?isMobile=${isMobile} total=${numPages} current=${this.currentPage}></lwdc-pagination-pages>

              <lwdc-button .type=${ButtonType.iconSquare} .size=${ButtonSize.small} @click=${() => this.pageChange(this.currentPage + 1)} ?disabled=${this.currentPage + 1 > numPages}>
                <lwdc-icon .icon=${chevronRightSmallIcon}></lwdc-icon>
              </lwdc-button>
          </div>
          ${this.showGoTo ? html `<lwdc-pagination-goto .max=${numPages} .label=${this.goToLabel}></lwdc-pagination-goto>`: undefined}
          ${this.showLabel ? html `<div class="wdc-pagination-label">${this.customLabel(labelFrom, labelTo, this.total)}</div>`: undefined}
		</nav>
		`;
	}

  defaultCustomLabel(from: number, to: number, total: number)  {
    const item = `item${total > 1 ? 's' : ''}`;

    return `${from.toLocaleString()}\u2013${to.toLocaleString()} of ${total.toLocaleString()} ${item}`;
  };

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

@customElement('lwdc-pagination-pages')
export class PaginationPagesElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
  isMobile=false;

  @property({ type: Number, attribute: true, reflect: true })
  total=0;

  @property({ type: Number, attribute: true, reflect: true })
  current=0;

  createRenderRoot() {
    return this;
  }

  getPages(total: number, current: number, isMobile: boolean): [number[], number[]] {
    const max = this.isMobile ? 3 : 7; // max pages to be shown at once
    const maxWithSplit = this.isMobile ? 2 : 6; // max amount of pages shown if pages are split
    const padNumber = this.isMobile ? 0 : 2; // padding pages around active page
    const showEndThreshold = this.isMobile ? 1 : 4; // how many pages to last page where first page is show again and last pages are visible

    // show all pages on left side
    if (this.total <= max) {
      return [range(1, this.total + 1), []];
    }

    // Mobile shows last pages without first page, unlike desktop
    if (this.isMobile && this.current >= this.total - showEndThreshold) {
      return [range(this.total - max + 1, this.total + 1), []];
    }

    // show padding pages around current page on left and last page on right
    if (this.current <= this.total - showEndThreshold) {
      const minPage = Math.max(1, this.current - padNumber);
      const maxPage = Math.max(maxWithSplit, this.current + padNumber + 1);
      return [range(minPage, maxPage), [this.total]];
    }

    // show first page on left and last pages on the right
    return [[1], range(this.total - maxWithSplit + padNumber, this.total + 1)];
  }

  pageToButton(page: number){
    let pagination = closestElement('lwdc-pagination', this) as PaginationElement;
    let buttonType = page === this.current ? ButtonType.iconSquareFilled : ButtonType.iconSquare;
    return html `<lwdc-button ?page-selected=${page === this.current} .type=${buttonType} .size=${ButtonSize.small} @click=${() => pagination.pageChange(page)}>
    ${page}
    </lwdc-button>`;
  }

  render() {
    const [left, right] = this.getPages(this.total, this.current, this.isMobile);

    const ellipsis =
      right.length === 0
        ? html ``
        : html `
            <span class="wdc-pagination-ellipsis">
              ...
            </span>
          `;
    //const buttons = [...left.map(this.pageToButton), ...ellipsis, ...right.map(this.pageToButton)];
    return html `${left.map(this.pageToButton.bind(this))}${ellipsis}${right.map(this.pageToButton.bind(this))}`;

  }
}

@customElement('lwdc-pagination-goto')
export class PaginationGoToElement extends LitElement {

  @property({ type: Number, attribute: true, reflect: true })
  max=0;

  @property({ type: String, attribute: true, reflect: true })
  label="Go To";

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
    return html `<div class="wdc-pagination-goto-wrapper">
                  <label class="wdc-pagination-goto-label">${this.label}</label>
                  <form class="wdc-pagination-goto-form" @submit=${this.formSubmit}>
                    		<lwdc-text name="goto" inputType="number" min=${1} max=${this.max}></lwdc-text>
                  </form>
                </div>`;
  }
}

export default {PaginationElement, PaginationPagesElement, PaginationGoToElement};
