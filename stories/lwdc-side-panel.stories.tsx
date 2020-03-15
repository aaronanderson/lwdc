/* eslint-disable import/extensions */
import { LitElement, html, css, customElement, property } from 'lit-element';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { plusIcon, homeIcon, starIcon, rocketIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-side-panel';
import '../lib/lwdc-button';
import '../lib/lwdc-icon';
import { ButtonType, ButtonSize } from '../lib/lwdc-button';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; flex-flow: column; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-sidepanel',
	decorators: [withKnobs, center]
};






export const sidepanelStory = () => {
	let opened = true;
	return html`<lwdc-side-panel-example></lwdc-side-panel-example>
	
				
				`;
}

sidepanelStory.story = {
	name: 'Side Panel'
}

@customElement('lwdc-side-panel-example')
export class SidePanelElement extends LitElement {


	@property({ type: Boolean })
	opened: boolean = true;

	static get styles() {
		return [css`
					.listTitle {
						/*@include wdc-type();
						@include wdc-type-h4();*/
						font-size: 16px;
						line-height: 24px;
						font-weight: 700;
						color: #333333;
						font-family: "Roboto","Helvetica Neue","Helvetica",Arial,sans-serif;
						padding-left: 24px;
					}
					
					ul {
						 padding-left: 0;
					}

					li {
					  display: flex;
  					  list-style: none;
  					  align-items: end;
					  cursor: pointer;
					}

					li.opened {
						padding: 15px 24px;
  						margin-left: -24px;
  						margin-right: -24px;
					}

					li.closed {
						padding: 15px 20px;
 						margin-left: 0;
  						margin-right: 0;
  						justify-content: center;
					}

  					li:hover {
    					background-color: #e8ebed;
					}
					
					lwdc-button {
						margin: 15px auto;
  						display: block;
					}

					lwdc-button.closed {
						padding-left: 15px;
					}
		
		`];
	}



	render() {
		return html`
			<lwdc-side-panel header="Side Panel Header"  @lwdc-side-panel-toggle=${(e: CustomEvent) => { this.opened = e.detail.opened; }}>
					${this.sidePanelContent}
			</lwdc-side-panel>
		
		`;
	}

	get sidePanelContent() {
		return this.opened ?
			html` <lwdc-button>Add New</lwdc-button>
		  <ul>
			<li class="opened">
				<lwdc-icon .icon=${homeIcon}></lwdc-icon>
				<span class="listTitle">Home</span>
			</li>
			<li class="opened">
				<lwdc-icon .icon=${starIcon}></lwdc-icon>
				<span class="listTitle">Favorites</span>
			</li>
			<li class="opened">
				<lwdc-icon .icon=${rocketIcon}></lwdc-icon>
				<span class="listTitle">Items</span>
			</li>
		  </ul>
	`: html`
		  <lwdc-button class="closed" .type=${ButtonType.iconCircleFilled} .size=${ButtonSize.small}><lwdc-icon .icon=${plusIcon}></lwdc-icon> </lwdc-button>	
		  <ul>
			<li class="closed">
				<lwdc-icon .icon=${homeIcon}></lwdc-icon>
			</li>
			<li class="closed">
				<lwdc-icon .icon=${starIcon}></lwdc-icon>
			</li>
			<li class="closed">
				<lwdc-icon .icon=${rocketIcon}></lwdc-icon>
			</li>
		  </ul>
	`;

	}

}

