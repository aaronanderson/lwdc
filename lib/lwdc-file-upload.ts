import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement, query} from 'lit/decorators.js';

import { FormBaseElement } from './util';

import './lwdc-button';

import styleCSS from './lwdc-file-upload.scss';
import { ErrorType } from './lwdc-form-field';
import { ButtonSize, ButtonType } from './lwdc-button';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-file-upload')
export class FileUploadElement extends FormBaseElement(LitElement) {

	@property({ type: Boolean, attribute: true, reflect: true })
	multiple = false;

	@property({ type: Boolean })
	picker = true;

	@query("input")
	fileInput?: HTMLInputElement;

	static get styles() {
		return [style];
	}

	get files() {
		return this.fileInput && this.fileInput.files ? Array.from(this.fileInput.files) : [];
	}

	select() {
		if (this.fileInput) {
			this.fileInput.click();
		}
	}

	render() {
		return this.picker ? this.pickerTemplate : this.defaultTemplate;
	}

	get pickerTemplate() {
		return html`
				<div class="lwdc-file-upload-wrapper">
					 	<input type="file" ?multiple=${this.multiple} @change=${(e: Event) => { if(this.checkValidity()){this.handleFileSelected()}; this.requestUpdate(); }}/>
				</div>
				<div class="lwdc-file-upload-picker">
					<lwdc-button .size=${ButtonSize.small} .type=${ButtonType.default} @click=${(e: MouseEvent) => this.select()}>Choose</lwdc-button>
					<div class="lwdc-file-upload-picker-list">
						${this.files.map((e: File) => html`<span>${e.name}</span>`)}
					</div>
				</div>
		`;
	}

	get defaultTemplate() {
		return html`
				<div class="lwdc-file-upload-wrapper">
					 	<input type="file" ?multiple=${this.multiple} @change=${this.handleFileSelected.bind(this)} />
				</div>
		`;
	}

	handleFileSelected() {
		this.dispatchEvent(new CustomEvent(`lwdc-file-upload-selected`, {
			detail: {
				files: this.files
			}
		}));
	}

	get filePicker() {
		return this.shadowRoot!.querySelector(".lwdc-file-upload-picker-list") as HTMLDivElement;
	}

	checkValidity() {
		if (!this.matches(':disabled') && (this.hasAttribute('required') && this.files.length == 0)) {
			let message = this.formField ? `${this.formField.label} is required` : 'Required';
			this.setInternals(true, () => message);
			if (this.picker && this.formField) {
				if (this.formField.errorType == ErrorType.alert) {
					this.filePicker.classList.add('lwdc-file-upload-alert');
				} else {
					this.filePicker.classList.add('lwdc-file-upload-error');
				}
			}
		} else {
			this.setInternals(false);
			if (this.picker && this.formField) {
				this.filePicker.classList.remove('lwdc-file-upload-alert', 'lwdc-file-upload-error');
			}
		}
		return this._internals.checkValidity();
	}


	formResetCallback() {
		if (this.fileInput){
			this.fileInput.value = '';
		}
		super.formResetCallback();
		if (this.picker && this.formField) {
			this.filePicker.classList.remove('lwdc-file-upload-alert', 'lwdc-file-upload-error');
		}
		this.requestUpdate();
	}

}

export default FileUploadElement;
