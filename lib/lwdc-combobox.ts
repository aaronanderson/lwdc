import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import { xIcon } from '@workday/canvas-system-icons-web';
import './lwdc-menu-item';
import './lwdc-button';

import styleCSS from './lwdc-combobox.scss';
import {classMap} from  'lit/directives/class-map.js';
import { FormBaseElement } from './util';
import { MenuElement } from './lwdc-menu';
import { ButtonType, ButtonSize } from './lwdc-button';
import { ErrorType } from './lwdc-form-field';
const style = css([`${styleCSS}`] as any) as CSSResult;

//git diff HEAD 'HEAD@{2020-03-01}' -- modules/_labs/combobox/react/lib

@customElement('lwdc-combobox')
export class ComboboxElement<T> extends FormBaseElement(LitElement) {

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	displayMenu = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: String;


	@property({ type: String, attribute: true, reflect: true })
	width?: string;

	@property({ type: String, attribute: true, reflect: true })
	height?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	wrap?: boolean = false;

	@property({ type: String, attribute: true, reflect: true })
	selectedWidth?: string;

	@property({ type: String, attribute: true, reflect: true })
	selectedHeight?: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	selectedWrap?: boolean = false;

	@property({ type: Object })
	nameSelector: ComboboxNameSelector<T> = defaultNameSelector;

	@property({ type: Array })
	options: Array<T> = [];

	@property({ type: Array })
	selected: Set<T> = new Set();

	filtered: Array<T> = [];

	static get styles() {
		return [style];
	}


	firstUpdated() {
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
		this.addEventListener('focus', () => {
			this.calculateMenu();
		});
		this.searchInput.addEventListener('focus', () => {
			this.calculateMenu();
		});

		const selected = () => {
			this.calculateMenu();
			this.checkValidity();
			this.searchInput.value = '';
			this.filtered = this.options;
		};
		this.addEventListener('blur', selected);
		this.addEventListener('keypress', (e: KeyboardEvent) => {
			if (e.keyCode === 13) {
				selected();
			}
		});

	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("options")) {
			this.filtered = this.options;
			if (!changedProperties.has("selected")) {
				this.selected.clear();
			}
			this.requestUpdate();
		}
		if (changedProperties.has("width") && this.width) {
			this.style.setProperty('--lwdc-combobox-width', this.width);
		}
		if (changedProperties.has("width") && this.height) {
			this.style.setProperty('--lwdc-combobox-height', this.height);
		}
		if (changedProperties.has("selectedWidth") && this.selectedWidth) {
			this.style.setProperty('--lwdc-combobox-selected-width', this.selectedWidth);
		}
		if (changedProperties.has("selectedHeight") && this.selectedHeight) {
			this.style.setProperty('--lwdc-combobox-selected-height', this.selectedHeight);
		}
	}


	render() {
		return html`

			<div class="lwdc-combobox-container">
				<div class="lwdc-combobox-input-container">

					<div class="wdc-form-textinput">
						<input formnovalidate type="search" placeholder=${ifDefined(this.placeholder)} ?disabled=${this.disabled} @input=${this.handleInput} @keydown=${this.handleKeydown}></input>
						<lwdc-button class="lwdc-combobox-reset-button" .type=${ButtonType.plain} .size=${ButtonSize.small} ?hidden=${ifDefined(this.selected.size ==  0)} @click=${this.handleReset}>
							<lwdc-icon .icon=${xIcon} .size=${16}></lwd-icon>
						</lwdc-button>
					</div>
					${this.menuTemplate}
					${this.selectedTemplate}
				</div>
			</div>
		`;
	}

	handleReset(){
		this.selected.clear();
		this.requestUpdate();
	}

	get searchInput() {
		return this.shadowRoot!.querySelector("input") as HTMLInputElement;
	}

	calculateMenu() {
		let activeElement = this.shadowRoot!.activeElement;
		if (activeElement && activeElement == this.searchInput) {
			this.displayMenu = true;
		} else if (activeElement && !!activeElement.closest("#selections")) {
			this.displayMenu = true;
		} else {
			this.displayMenu = false;
		}
		this.requestUpdate();
	}

	get menuTemplate() {
		if (this.displayMenu && this.filtered.length > 0) {
			let menuClass = {
				'lwdc-combobox-autocomplete-list': true,
				'lwdc-combobox-wrap': !!this.wrap
			}
			return html`
							<lwdc-menu id="selections" tabindex="0" class=${classMap(menuClass)} width=${this.width ? this.width : '280px'} @keydown=${this.handleKeydown}>
								${this.filtered.map((o: T) => {
				return html`<lwdc-menu-item ?selected=${this.selected.has(o)} @click=${() => this.handleClick(o)}>${this.nameSelector(o)}</lwdc-menu-item>`;
			})}
							</lwdc-menu>
						`
		}
	}

	get selectedTemplate() {
		if (!this.displayMenu && this.selected.size > 0) {

			let menuClass = {
				'wdc-card': true,
				'lwdc-combobox-selected-container': true,
				'lwdc-combobox-wrap': !!this.wrap || !!this.selectedWrap
			}
			return html`<div class=${classMap(menuClass)}>
							<div class="wdc-card-body">
								<ul id="selected" role="listbox" tabindex="0"  tabIndex="0">
								${this.options.map((o: T) => {

				return this.selected.has(o) ? html`<li><span class="wdc-menu-item-label">${this.nameSelector(o)}</span></li>` : null;
			})}
								</ul>
							</div>
					</div>`
		}
	}

	handleClick(o: T) {
		if (this.selected.has(o)) {
			this.selected.delete(o);
		} else {
			this.selected.add(o);
		}
		this.dispatchEvent(new CustomEvent(`lwdc-combobox-change`, {
			detail: {
				selected: this.selected
			}
		}));
		this.requestUpdate();
	}


	handleKeydown(e: KeyboardEvent) {
		//console.log(e, e.target);
		if (e.keyCode === 13 || (e.shiftKey && e.keyCode === 32)) {
			this.displayMenu = false;
			this.searchInput.blur();
		} else if (e.ctrlKey && e.key.toLowerCase() === 'a') {
			const selected = new Set();
			const unselected = new Set();
			for (const option of this.filtered) {
				if (this.selected.has(option)) {
					selected.add(option);
				} else {
					unselected.add(option);
				}
			}
			if (selected.size > 0 && unselected.size == 0) {
				for (const option of selected) {
					this.selected.delete(option as T);
				}
			} else {
				for (const option of unselected) {
					this.selected.add(option as T);
				}
			}
			this.dispatchEvent(new CustomEvent(`lwdc-combobox-change`, {
				detail: {
					selected: this.selected
				}
			}));
			this.requestUpdate();


		}

		// if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
		// 				this.trace = !this.trace;
		// 				const message = `trace ${this.trace ? 'enabled' : 'disabled'}`;
		// 				console.log(message);
		// 				openToast(message, false, this.shadowRoot);
		// 			}
	}

	handleInput(e: Event) {
		let filterValue = (e.target as HTMLInputElement).value;
		if (filterValue) {
			const regex = new RegExp(filterValue, 'gi');
			this.filtered = this.options.filter((o: T) => {
				let name = this.nameSelector(o);
				return name && !!name.match(regex);

			});
		} else {
			this.filtered = this.options;
		}
		this.checkValidity();
		this.requestUpdate();
	}

	checkValidity() {
		if (this._customValidity) {
			return false;
		}
		if (!this.matches(':disabled') && (this.hasAttribute('required') && this.selected.size == 0)) {
			if (this.formField) {
				this.setInternals(true, () => `${this.formField.label} is required`);
				if (this.formField.errorType == ErrorType.alert) {
					this.searchInput.parentElement!.classList.add('lwdc-combobox-alert');
				} else {
					this.searchInput.parentElement!.classList.add('lwdc-combobox-error');
				}
			} else {
				this.setInternals(true, () => `Required`);
			}
		} else {
			this.setInternals(false);
			if (this.formField) {
				this.searchInput.parentElement!.classList.remove('lwdc-combobox-error', 'lwdc-combobox-alert');
			}
		}
		return this._internals.checkValidity();
	}


	formResetCallback() {
		super.formResetCallback();
		this.selected.clear();
		if (this.formField) {
			this.searchInput.parentElement!.classList.remove('lwdc-combobox-error', 'lwdc-combobox-alert');
		}
		this.requestUpdate();
	}


}


const defaultNameSelector = function (value: any) {
	return value.name;
}

const defaultValueSelector = function (value: any) {
	return value.id;
}

export interface ComboboxNameSelector<T> {
	(value: T): string;
};



export default ComboboxElement;
