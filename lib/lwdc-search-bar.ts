import { LitElement, html, css, customElement, property, query } from 'lit-element';
import { xIcon, searchIcon} from '@workday/canvas-system-icons-web';

import {  ButtonType,ButtonSize } from './lwdc-button';
import {  TextElement } from './lwdc-text';

import './lwdc-button';
import './lwdc-form-field';
import './lwdc-text';

import styleCSS from './lwdc-search-bar.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-search-bar')
export class SearchBarElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	value?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: string = ' ';

	@property({ type: Number, attribute: true, reflect: true })
	height: number = 40;

	@property({ type: Boolean })
	resetEnabled = false;

	@query("lwdc-text")
	searchText?: TextElement;

	static get styles() {
		return [style];
	}

	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
	}



	render() {
		this.style.setProperty('--lwdc-search-bar-height', `${this.height}px`);

  	return html`<form class="lwdc-search-bar-form" @submit=${this.searchSubmit}>
								  <div class="lwdc-search-bar-container">
									<lwdc-button class="lwdc-search-bar-icon-search" .type=${ButtonType.plain}>
										<lwdc-icon .icon=${searchIcon}></lwdc-icon>
									</lwdc-button>
									<lwdc-form-field class="lwdc-search-bar-form-field">
												<lwdc-text class="lwdc-search-bar-input" name="search" inputType="search" placeholder=${this.placeholder} @input=${this.searchInput}></lwdc-text>
									</lwdc-form-field>
									<lwdc-button ?hidden=${!this.resetEnabled} class="lwdc-search-bar-icon-reset" .type=${ButtonType.plain} action="button" @click=${this.searchReset } }>
										<lwdc-icon .icon=${xIcon} .size=${16}></lwdc-icon>
									</lwdc-button>
									</div>
								</form>
				`;
	}


  searchInput(e: InputEvent){
		let value = e.target ? (e.target as HTMLInputElement).value: undefined;
		this.resetEnabled = value != '';
	}

	searchReset(){
		if (this.searchText) {
		  this.searchText.value='';
			this.resetEnabled = false;
			let event = new CustomEvent('lwdc-search-bar-reset');
			this.dispatchEvent(event);
	  }
	}

	searchSubmit(e: Event){
		e.preventDefault();
		if (this.searchText && this.searchText.value!=''){
			let event = new CustomEvent('lwdc-search-bar-query', {
				detail: {
					query: this.searchText.value
				}
			});
			this.dispatchEvent(event);
		}

	}


	handleChange(e: Event) {
		this.value = (<HTMLSelectElement>e.target).value;

	}

}



export default SearchBarElement;
