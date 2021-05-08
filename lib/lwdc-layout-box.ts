import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import styleCSS from './lwdc-layout-box.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-box-row')
export class LayoutBoxRowElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	start: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	center: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	end: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	top: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	middle: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	bottom: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	around: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	between: boolean = false;


	static get styles() {
		return [style];
	}

	render() {
		let rowClass = {
			'wdc-row': true,
			'wdc-row-start': this.start,
			'wdc-row-center': this.center,
			'wdc-row-end': this.end,
			'wdc-row-top': this.top,
			'wdc-row-middle': this.middle,
			'wdc-row-bottom': this.bottom,
			'wdc-row-around': this.around,
			'wdc-row-between': this.between,
		};

		return html`
			<div class=${classMap(rowClass)} role="region" aria-label="Action Bar">				  
				  	<slot></slot>
			</div>
		`;
	}

}


@customElement('lwdc-box-col')
export class LayoutBoxColumnElement extends LitElement {

	@property({ type: Number, attribute: true, reflect: true })
	sm?: number = undefined;

	@property({ type: Number, attribute: true, reflect: true })
	md?: number = undefined;

	@property({ type: Number, attribute: true, reflect: true })
	lg?: number = undefined;

	@property({ type: Number, attribute: true, reflect: true })
	xl?: number = undefined;

	@property({ type: Number, attribute: true, reflect: true })
	offset?: number = undefined;

	@property({ type: Number, attribute: true, reflect: true })
	position?: number = undefined;


	static get styles() {
		return [style];
	}

	render() {
		let colClass: any = {};

		if (this.position) {
			colClass[`wdc-col-${this.position}`] = true;
		}

		if (this.offset) {
			colClass[`wdc-col-offset-${this.offset}`] = true;
		}

		if (this.sm) {
			colClass[`wdc-col-sm-${this.sm}`] = true;
		}

		if (this.md) {
			colClass[`wdc-col-md-${this.md}`] = true;
		}

		if (this.lg) {
			colClass[`wdc-col-lg-${this.lg}`] = true;
		}

		if (this.xl) {
			colClass[`wdc-col-xl-${this.xl}`] = true;
		}

		if (!this.position && !this.sm && !this.md && !this.lg && !this.xl) {
			colClass['wdc-col'] = true;
		}

		return html`
			<div class=${classMap(colClass)}>
				<slot></slot>
			</div>`;
	}

}

export default { LayoutBoxRowElement, LayoutBoxColumnElement };








