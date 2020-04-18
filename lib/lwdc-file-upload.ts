import { LitElement, html, css, customElement, property } from 'lit-element';
import { styleLightDOM } from './util';

import styleCSS from './lwdc-file-upload.scss';
const style = css([`${styleCSS}`] as any)


@customElement('lwdc-file-upload')
export class FileUploadElement extends LitElement {

	@property({ type: Boolean, attribute: true, reflect: true })
	multiple = false;

	static get styles() {
		return [style];
	}

	get fileInput() {
		return this.shadowRoot!.querySelector("input") as HTMLInputElement;
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
		return html`		
					<div class="lwdc-upload-wrapper">
					 	<input type="file" ?multiple=${this.multiple} @change="${this.handleFileSelected}"/>
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

}

export default FileUploadElement;







