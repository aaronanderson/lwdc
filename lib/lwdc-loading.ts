import { LitElement, html, css, customElement, property } from 'lit-element';

const style = css(<any>[require('./lwdc-loading.scss').default]);


@customElement('lwdc-loading')
export class LoadingElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	loading?= false;

	@property({ type: String, attribute: true, reflect: true })
	title = '';

	static get styles() {
		return [style];
	}

	render() {
		return html`
		${this.title ? html`<div style="margin-right: 24px;">${this.title}</div>` : null}
		<div class="wdc-loading-dots">		
      		<span/>
		</div>
		`;
	}

}

export default LoadingElement;







