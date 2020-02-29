import { LitElement, html, css, customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import FormFieldElement from './lwdc-form-field';
import './lwdc-menu-item';

const style = css(<any>[require('./lwdc-combobox.scss').default]);


@customElement('lwdc-combobox')
export class ComboboxElement<T> extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	name?: String;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	displayMenu = false;

	@property({ type: String, attribute: true, reflect: true })
	placeholder?: String;

	@property({ type: Object })
	nameSelector: ComboboxNameSelector<T> = defaultNameSelector;

	@property({ type: Array })
	options: Array<T> = [];


	selected: Set<T> = new Set();

	filtered: Array<T> = [];



	static formAssociated = true;

	//https://web.dev/more-capable-form-controls/#event-based-api
	//https://github.com/microsoft/TypeScript/issues/33218
	internals?: any;

	static get styles() {
		return [style];
	}


	firstUpdated() {
		this.internals = (this as any).attachInternals();
		if (!this.getAttribute("tabindex")) {
			this.setAttribute("tabindex", "-1");
		}
		this.addEventListener('focus', () => {
			this.calculateMenu();
		});
		this.searchInput.addEventListener('focus', () => {
			this.calculateMenu();
		});
		this.addEventListener('blur', () => {
			this.calculateMenu();
			this.checkValidity();
			this.searchInput.value = '';
			this.filtered = this.options;
		});
		this.filtered = this.options;
		this.selected.clear();
	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("options")) {
			this.selected.clear();
			this.requestUpdate();
		}
	}


	render() {

		return html`
			
			<div class="lwdc-combobox-container">
				<div class="lwdc-combobox-input-container">
				    
					<div class="wdc-form-textinput">
						<input formnovalidate type="search" placeholder="${ifDefined(this.placeholder)}" ?disabled=${this.disabled} @input=${this.handleInput}></input>
					</div>
					${this.menuTemplate}
					${this.selectedTemplate}
				</div>
			</div>
		`;
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
	}

	get menuTemplate() {
		if (this.displayMenu && this.filtered.length > 0) {
			return html`
							<lwdc-menu id="selections" tabindex="0" class="lwdc-combobox-autocomplete-list" grow>
								${this.filtered.map((o: T) => {
				return html`<lwdc-menu-item ?selected=${this.selected.has(o)} @click=${() => this.handleClick(o)}>${this.nameSelector(o)}</lwdc-menu-item>`;
			})}
							</lwdc-menu>		
						`
		}
	}

	get selectedTemplate() {
		if (!this.displayMenu && this.selected.size > 0) {
			return html`<div class="wdc-card lwdc-combobox-selected-container">
							<div class="wdc-card-body">
								<ul id="selected" role="listbox" tabindex="0"  tabIndex="0">
								${this.options.map((o: T) => {

				return this.selected.has(o) ? html`<li>${this.nameSelector(o)}</li>` : null;
			})}
								</ul>
							</div>		
					</div>`
		}
	}

	handleClick(o: T) {
		console.log(o);
		if (this.selected.has(o)) {
			this.selected.delete(o);
		} else {
			this.selected.add(o);
		}
		this.requestUpdate();
	}

	handleKeydown() {

	}


	get formField() {
		return this.closest('lwdc-form-field') as FormFieldElement;
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
		if (!this.matches(':disabled') && (this.hasAttribute('required') && this.selected.size == 0)) {
			this.internals.setValidity({ customError: true }, `${this.formField.label} is required`);
			this.formField.hintText = this.internals.validationMessage;
		} else {
			this.internals.setValidity({ customError: false });
			this.formField.hintText = undefined;
		}
		return this.internals.checkValidity();
	}

	formResetCallback() {
		this.selected.clear();
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







