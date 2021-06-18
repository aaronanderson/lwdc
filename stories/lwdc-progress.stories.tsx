/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-progress';

loadWDCFonts();

const value = ['0', '25', '50', '50', '75', '100'];
const valueOptions: Record<string, string> = value.reduce((r: Record<string, string>, e: string) => { r[e] = e; return r; }, {});
const valuesRadioKnob = () => radios("Value", valueOptions, '25') as any;



export const progressStory = () => {
	return html`<lwdc-progress title="Progress" value=${valuesRadioKnob()}></lwdc-progress>`;
}

progressStory.storyName = 'Progress';
progressStory.parameters = { layout: 'centered' };
progressStory.component = 'lwdc-progress';
progressStory.decorators= [withKnobs];
