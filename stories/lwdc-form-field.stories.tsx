/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-form';
import { ErrorType } from '../lib/lwdc-form-field';


loadWDCFonts();

const center = (storyFn: () => unknown) => html`<div style="display: flex; align-items: center; justify-content: center; margin: 64px 64px;">${storyFn()}</div>`;


export default {
	title: 'LitElement Workday Canvas Kit Web Components/Form Field',
	component: 'lwdc-form-field',
	decorators: [withKnobs, center]
};


//<div class="wdc-form"> </div>
export const formFieldNormalStory = () => {
	return html`<lwdc-form>		
					<lwdc-form-field label="Label"><div>Value</div></lwdc-form-field>						
				</lwdc-form>`;
}
formFieldNormalStory.story = {
	name: 'Label'
}

export const formFieldLeftlStory = () => {
	return html`<lwdc-form><lwdc-form-field label="Label" .errorType=${ErrorType.alert} hintText="Check Value"><div>Value</div></lwdc-form-field></lwdc-form>`;
}
formFieldLeftlStory.story = {
	name: 'Hint'
}