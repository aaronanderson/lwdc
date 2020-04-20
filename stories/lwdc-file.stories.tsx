/* eslint-disable import/extensions */
import { LitElement, html, css, customElement, property } from 'lit-element';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form';
import '../lib/lwdc-file-upload';
import '../lib/lwdc-action-bar';
import '../lib/lwdc-button';

import { coreStyle } from '../lib/lwdc-core';
import { ButtonType } from '../lib/lwdc-button';
import { fileDownload } from '../lib/util';
import FileUploadElement from '../lib/lwdc-file-upload';




loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; flex-flow: column; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components/File',
	component: 'lwdc-file-upload',
	decorators: [withKnobs, center]
};



export const fileDownloadStory = () => {
	return html`
				<lwdc-action-bar>
					<a href="/testfile.txt" download><lwdc-button>Anchor</lwdc-button></a>
					<lwdc-button @click=${(e: MouseEvent) => fileDownload('/testfile.txt', 'testfile.txt')}>Blob</lwdc-button>			
			</lwdc-action-bar>	
			
	
				`;
}
fileDownloadStory.story = {
	name: 'Download'
}


export const fileUploadStory = () => {
	return html`<lwdc-file-upload-example></lwdc-file-upload-example>`;
}

fileUploadStory.story = {
	name: 'Upload'
}

@customElement('lwdc-file-upload-example')
class FileUploadExampleElement extends LitElement {

	@property({ type: Array })
	files: Array<File> = [];

	static get styles() {
		return [coreStyle];
	}
	get fileUpload() {
		return this.shadowRoot!.querySelector("#no-picker") as FileUploadElement;
	}

	render() {
		return html`
			<lwdc-file-upload multiple style="margin-bottom: 24px;"></lwdc-file-upload>
		
			${this.files.length > 0 ? html`<h3 class="wdc-type-h3">Selected Files:</h3>` : undefined}
			${this.files.map((e: File) => html`<h5 class="wdc-type-h5">${e.name}</h5>`)}

			<lwdc-file-upload id="no-picker" multiple .picker=${false} @lwdc-file-upload-selected=${(e: CustomEvent) => this.files = e.detail.files}></lwdc-file-upload>
						
			<lwdc-action-bar>				
				<lwdc-button @click=${(e: MouseEvent) => this.fileUpload.select()}>Select</lwdc-button>	
				<lwdc-button ?disabled=${this.files.length == 0} @click=${this.fileUploadHandler}>Upload</lwdc-button>							
			</lwdc-action-bar>	
		
		`;
	}

	async fileUploadHandler(e: MouseEvent) {
		let formData = new FormData();
		formData.append("testId", "1");
		this.files.forEach((f: File, i: number) => formData.append(`file-${i}`, f));
		console.log('File Upload', formData);
		action("File Upload");
		try {
			/*const response = await fetch('/upload-test', {
				method: 'PUT',
				body: formData
			});
			const result = await response.json();
			console.log('Success:', JSON.stringify(result));
			*/
		} catch (error) {
			console.error('Error:', error);
		}
	}

}

