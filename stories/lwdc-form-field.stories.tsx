/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-form-field';
import '../lib/lwdc-form';
import { ErrorType } from '../lib/lwdc-form-field';


loadWDCFonts();


//<div class="wdc-form"> </div>
export const formFieldNormalStory = () => {
	return html`<lwdc-form>
					<lwdc-form-field label="Label"><div>Value</div></lwdc-form-field>
				</lwdc-form>`;
}

formFieldNormalStory.storyName = 'Label';
formFieldNormalStory.parameters = { layout: 'centered' };
formFieldNormalStory.component = 'lwdc-form-field';
formFieldNormalStory.decorators= [withKnobs];


export const formFieldLeftlStory = () => {
	return html`<lwdc-form><lwdc-form-field label="Label" .errorType=${ErrorType.alert} hint-text="Check Value"><div>Value</div></lwdc-form-field></lwdc-form>`;
}

formFieldLeftlStory.storyName = 'Hint';
formFieldLeftlStory.parameters = { layout: 'centered' };
formFieldLeftlStory.component = 'lwdc-form-field';
formFieldLeftlStory.decorators= [withKnobs];
