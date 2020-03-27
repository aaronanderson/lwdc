import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

 import styleCSS from './lwdc-env-label.scss';
const style = css([`${styleCSS}`] as any)


/** Element to display service environment. */
@customElement('lwdc-env-label')
export class EnvLabelElement extends LitElement {

	@property({ type: String })
	env?: string;

	static get styles() {
		return [style];
	}

	render() {
		if (this.env && this.env != "prod") {
			let envClass = {
				'lwdc-env-qa': this.env == "qa",
				'lwdc-env-dev': this.env == "dev"
			};
			let envName = null;
			if (this.env == "qa") {
				envName = "QA Enviroment";
			} else if (this.env == "dev") {
				envName = "Development Enviroment";
			}
			return html`<div class="${classMap(envClass)}">${envName}</div>`;
		}

		return html``;


	}


}

export default EnvLabelElement;








