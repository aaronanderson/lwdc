import { LitElement, html, css, customElement, property } from 'lit-element';
import { CanvasIcon, CanvasIconTypes } from '@workday/design-assets-types';
import canvasColors from '@workday/canvas-colors-web';

// @ts-ignore
import { getColor } from '@workday/canvas-kit-css-icon/lib/utils.js';
import { styleLightDOM } from './util';

//@workday/canvas-kit-react-common can be removed as a NPM dependency after the next canvas kit release
const style = css(<any>[require('./lwdc-icon.scss').default]);


@customElement('lwdc-icon')
export class IconElement extends LitElement {

	@property({ type: Object })
	icon?: CanvasIcon;

	@property({ type: Number })
	size = 24;

	@property({ type: String })
	color = "licorice200";

	static get styles() {
		return [style];
	}


	connectedCallback() {
		styleLightDOM(this,style,'lwdc-icon');
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

		let fillColor = getColor(this.color);
		svg.querySelectorAll(".wd-icon-fill").forEach(f => {
			f.setAttribute('fill', fillColor);
		});


		return html`${base}`;
	}


}

export default IconElement;






