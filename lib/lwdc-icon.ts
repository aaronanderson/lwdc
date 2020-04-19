import { LitElement, html, css, customElement, property } from 'lit-element';
import { CanvasIcon, CanvasIconTypes } from '@workday/design-assets-types';
import canvasColors from '@workday/canvas-colors-web';

// @ts-ignore
import { getColor } from '@workday/canvas-kit-css-icon/lib/utils.js';
import { styleLightDOM } from './util';

import styleCSS from './lwdc-icon.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-icon')
export class IconElement extends LitElement {

	@property({ type: Object })
	icon?: CanvasIcon;

	@property({ type: Number })
	size = 24;

	@property({ type: String })
	accent?: string;

	@property({ type: String })
	accentHover?: string;

	@property({ type: String })
	background = "transparent";

	@property({ type: String })
	backgroundHover?: string;

	@property({ type: String })
	color = "licorice200";

	@property({ type: String })
	colorHover = "licorice500";

	@property({ type: String })
	fill?: string;

	@property({ type: String })
	fillHover?: string;

	static get styles() {
		return [style];
	}


	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-icon');
		super.connectedCallback();
	}

	//Render in the light DOM due to multiple CSS rules
	createRenderRoot() {
		return this;
	}

	render() {
		let ico = this.icon as any;
		let base = document.createElement("span");
		base.classList.add("lwdc-icon");
		base.insertAdjacentHTML("afterbegin", ico.svg);
		let svg = base.children[0] as SVGElement;

		svg.style.height = this.size + 'px';
		svg.style.width = this.size + 'px';

		let accentColor = this.accent ? getColor(this.accent) : '';
		this.style.setProperty('--lwdc-icon-accent', accentColor);

		let accentHoverColor = this.accentHover ? getColor(this.accentHover) : '';
		this.style.setProperty('--lwdc-icon-accent-hover', accentHoverColor);

		let backgroundColor = getColor(this.background);
		this.style.setProperty('--lwdc-icon-background', backgroundColor);

		let backgroundHoverColor = this.backgroundHover ? getColor(this.backgroundHover) : '';
		this.style.setProperty('--lwdc-icon-background-hover', backgroundHoverColor);

		let colorColor = getColor(this.color);
		this.style.setProperty('--lwdc-icon-color', colorColor);

		let colorHoverColor = this.colorHover ? getColor(this.colorHover) : '';
		this.style.setProperty('--lwdc-icon-color-hover', colorHoverColor);

		let fillColor = this.fill ? getColor(this.fill) : '';
		this.style.setProperty('--lwdc-icon-fill', fillColor);

		let fillHoverColor = this.fillHover ? getColor(this.fillHover) : '';
		this.style.setProperty('--lwdc-icon-fill-hover', fillHoverColor);




		return html`${base}`;
	}


}

export default IconElement;






