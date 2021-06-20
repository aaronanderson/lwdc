/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-env-label';
import { RadiosTypeOptionsProp } from '@storybook/addon-knobs/dist/ts3.9/components/types';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-env-label',
	decorators: [withKnobs]
};


const envs = ['dev', 'qa', 'prod'];
const envOptions: RadiosTypeOptionsProp<string> = envs.reduce((r: RadiosTypeOptionsProp<string>, e: string) => { r[e] = e; return r; }, {});
const envsRadioKnob = () => radios("Environment", envOptions, 'dev') as any;

export const envLabelStory = () => {
	return html`<p style="margin: 10px;">Environment</p> <lwdc-env-label .env=${envsRadioKnob()}></lwdc-env-label>`;
}

envLabelStory.storyName = 'Environment Label';
envLabelStory.parameters = { layout: 'centered' };
