import { LitElement, html, css, customElement, property } from 'lit-element';

import {CanvasTheme, themeElement} from './theme';

import styleCSS from './lwdc-progress.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-progress')
export class ProgressElement extends themeElement(LitElement) {

	@property({ type: String, attribute: true, reflect: true })
	title: string = '';

	@property({ type: Number, attribute: true, reflect: true })
	value: number = 0;

	@property({ type: Number, attribute: true, reflect: true })
	max: number = 100;

	@property({ type: Boolean })
	showLabel: boolean = true;


	static get styles() {
		return [style];
	}

	render() {

		return html`

			<div class="lwdc-progress-container">
					${this.title != '' ? html`<h3 class="wdc-type-h3">${this.title}</h3>` : undefined}
					<progress value="${this.value}" max="${this.max}"></progress>
					${this.showLabel ? html`<span class="wdc-type-variant-label">${Math.round(this.value != 0 ? (this.value / this.max) * 100 : 0)}%</span>` : undefined}
			</div>

		`;

	}

	themeChanged(theme: CanvasTheme) {
		//this.style.setProperty('--lwdc-theme-primary-main', theme.palette.primary.main);
		//this.style.setProperty('--lwdc-theme-primary-contrast', theme.palette.primary.contrast);
	}


}

export default ProgressElement;
