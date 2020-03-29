import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap, StyleInfo } from 'lit-html/directives/style-map';

import styleCSS from './lwdc-layout-section.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-section-row')
export class LayoutSectionElement extends LitElement {

	@property({ type: Number, attribute: true, reflect: true })
	spacing?: number = 12;

	@property({ type: Number, attribute: true, reflect: true })
	gutter?: number = 12;

	@property({ type: Boolean, attribute: true, reflect: true })
	capWidth: boolean = false;


	static get styles() {
		return [style];
	}

	render() {
		let containerStyles: any = {};
		if (this.gutter) {
			containerStyles['padding'] = `0 ${this.gutter}`;
		}

		if (this.capWidth) {
			containerStyles['max-width'] = '1280px';
			containerStyles['margin'] = '0 auto';
		}

		return html`
			<div class="layoutContainer" style="${styleMap(containerStyles)}">				  
				<slot @slotchange=${this.slotChanged}></slot>
			</div>
		`;
	}

	slotChanged(e: Event) {
		if (this.spacing) {
			let slot = e.target as HTMLSlotElement;
			let elements = slot.assignedElements();
			for (const element of elements) {
				if (element instanceof LayoutSectionColumnElement) {
					const column = element as LayoutSectionColumnElement;
					if (!column.spacing && column.spacing !== 0) {
						column.spacing = this.spacing;

					}

				}
			}
		}
	}


}


@customElement('lwdc-section-col')
export class LayoutSectionColumnElement extends LitElement {

	@property({ type: Number, attribute: true, reflect: true })
	spacing?: number;

	@property({ type: String, attribute: true, reflect: true })
	width?: string = undefined;

	@property({ type: Number, attribute: true, reflect: true })
	columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;



	static get styles() {
		return [style];
	}

	render() {
		let colStyle: any = {};
		if (this.spacing) {
			colStyle['padding'] = `0 ${this.spacing}px`;
		}
		if (this.width) {
			colStyle['max-width'] = `${this.width}`;
		} else if (this.columns) {
			if (this.columns === 12) {
				colStyle['width'] = `100%`;
			} else {
				const compensation = ((12 - this.columns) / 12) * ((this.spacing || 0) * 2);
				colStyle['max-width'] = `calc(${(this.columns / 12) * 100}% - ${compensation}px)`;
			}
		}

		return html`
			<div class="columnContainer" style="${styleMap(colStyle)}">
				<slot></slot>
			</div>`;
	}

}

export default { LayoutSectionElement, LayoutSectionColumnElement };








