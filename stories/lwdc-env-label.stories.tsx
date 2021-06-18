/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-env-label';

loadWDCFonts();


const envs = ['dev', 'qa', 'prod'];
const envOptions: Record<string, string> = envs.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const envsRadioKnob = () => radios("Environment", envOptions, 'dev') as any;

export const envLabelStory = () => {
	return html`<p style="margin: 10px;">Environment</p> <lwdc-env-label .env=${envsRadioKnob()}></lwdc-env-label>`;
}

envLabelStory.storyName = 'Environment Label';
envLabelStory.parameters = { layout: 'centered' };
envLabelStory.component = 'lwdc-env-label';
envLabelStory.decorators= [withKnobs];
