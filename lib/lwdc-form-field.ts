import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from  'lit/directives/class-map.js';
import { styleLightDOM } from './util';

import styleCSS from './lwdc-form-field.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;


@customElement('lwdc-form-field')
export class FormFieldElement extends LitElement {

	@property({ type: String, attribute: true, reflect: true })
	group = undefined;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled = false;

	@property({ type: String, attribute: true, reflect: true })
	label?: String;

	@property({ type: String, attribute: 'hint-text', reflect: true })
	hintText?: String;

	@property({ type: Boolean })
	showLabel = true;


	@property({ type: Number })
	errorType: ErrorType = ErrorType.error;

	elementChildren: Array<Element> = [];

	static get styles() {
		return [style];
	}

	//disable shadow DOM so containing wdc-form class relative css can be applied
	//https://github.com/Polymer/lit-element/issues/824#issuecomment-536093753
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		styleLightDOM(this, style, 'lwdc-form-field');
		this.elementChildren = Array.from(this.children);
		super.connectedCallback();
	}

	render() {
		return this.group ? this.groupTemplate : this.defaultTemplate;
	}

	get defaultTemplate() {

		let fieldClass = {
			'wdc-form-field-wrapper': this.showLabel,
			'wdc-form-group': !!this.group,
			'wdc-form-field-error': (this.errorType == ErrorType.error) && !!this.hintText,
			'wdc-form-field-alert': (this.errorType == ErrorType.alert) && !!this.hintText
		};
		let formClass = {
			'wdc-form-field': true,
			'wdc-form-error': (this.errorType == ErrorType.error) && !!this.hintText,
			'wdc-form-alert': (this.errorType == ErrorType.alert) && !!this.hintText
		};


		return html`<div class=${classMap(fieldClass)}>
						${this.showLabel ?
				html`<label class="wdc-form-label">
									${ifDefined(this.label)}
									${this.requiredTemplate}
								</label>`: undefined}
						<div class=${classMap(formClass)}>
							${this.elementChildren}
							${this.hintTemplate}
						</div>
					</div>
					`;
	}

	get groupTemplate() {
		let fieldClass = {
			'wdc-form-field-wrapper': this.showLabel,
			'wdc-form-group': !!this.group,
			'wdc-form-field-error': (this.errorType == ErrorType.error) && !!this.hintText,
			'wdc-form-field-alert': (this.errorType == ErrorType.alert) && !!this.hintText
		};
		let formClass = {
			'wdc-form-field': true,
			'wdc-form-error': (this.errorType == ErrorType.error) && !!this.hintText,
			'wdc-form-alert': (this.errorType == ErrorType.alert) && !!this.hintText
		};


		return html`<fieldset class=${classMap(fieldClass)}>
						${this.showLabel ?
				html`<legend class="wdc-form-label">
							${ifDefined(this.label)}
							${this.requiredTemplate}
						</legend>`: undefined}
						 <div class="wdc-form-group-fields">

							${this.elementChildren.map((e: Element) => {
					return html`<div class=${classMap(formClass)}>${e}</div>`;
				})}
								${this.hintTemplate}
							</div>
					</fieldset>
					`;
	}

	get hintTemplate() {
		if (this.hintText) {
			let hintClass = {
				'wdc-form-hint-message': true,
				'lwdc-form-hint-message-error': this.errorType == ErrorType.error,
				'lwdc-form-hint-message-alert': this.errorType == ErrorType.alert
			};
			return html`<div class=${classMap(hintClass)}>
				${this.errorType == ErrorType.error ? html`<strong>Error:</strong> ${this.hintText}` : html`<strong>Alert:</strong> ${this.hintText}`}
			</div>`;
		}
	}

	get requiredTemplate() {
		let hasRequired = !!this.elementChildren.find((e: Element) => e.hasAttribute("required"));
		if (hasRequired) {
			return html`<abbr class="lwdc-required-astrisk">*</abbr>`;
		}
	}

}

export enum FormFieldLabelPosition {
	Top,
	Left,
	Hidden,
}

export enum ErrorType {
	alert,
	error
}

export default FormFieldElement;
