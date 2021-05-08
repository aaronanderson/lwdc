import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { CanvasIcon, CanvasIconTypes } from '@workday/design-assets-types';

// @ts-ignore
import initializeIcons from '@workday/canvas-kit-css-icon/lib/canvas-kit-css-icon.js';

import styleCSS from './lwdc-icon-inject.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


/** This component wraps the https://github.com/Workday/canvas-kit/tree/master/modules/icon/css Javascript and provides full support of all icon varieties. 
 * It is slower due to the icon svg files being downloaded from a CDN and the Javascript function executions that convert the the <i> tags to the target icon SVG. */
@customElement('lwdc-icon-inject')
export class IconInjectElement extends LitElement {


	static get styles() {
		return [style];
	}

	connectedCallback() {
		super.connectedCallback();
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				(<LitElement>mutation.target).requestUpdate();
			});
		});


		observer.observe(this, {
			attributes: true,
		});
	}

	render() {

		let base = document.createElement("i");
		base.classList.add("wdc-icon");
		for (let name of this.getAttributeNames()) {
			if (name.startsWith("data-")) {
				let value = this.getAttribute(name);
				if (value) {
					base.setAttribute(name, value);
				}
			}

		}
		return html`${base}`;
	}

	updated(changedProperties: Map<string, any>) {
		console.log("updated", changedProperties);
		initializeIcons(null, '.wdc-icon', this.shadowRoot);
	}


}

export default IconInjectElement;






