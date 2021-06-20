/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { setupIcon, uploadCloudIcon, extLinkIcon, userIcon } from '@workday/canvas-system-icons-web';

import { loadWDCFonts } from '../lib/lwdc-fonts';

import '../lib/lwdc-progress';
import { RadiosTypeOptionsProp } from '@storybook/addon-knobs/dist/ts3.9/components/types';

loadWDCFonts();

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	component: 'lwdc-progress',
	decorators: [withKnobs]
};

const value = ['0', '25', '50', '50', '75', '100'];
const valueOptions: RadiosTypeOptionsProp<string> = value.reduce((r: RadiosTypeOptionsProp<string>, e: string) => { r[e] = e; return r; }, {});
const valuesRadioKnob = () => radios("Value", valueOptions, '25') as any;



export const progressStory = () => {
	return html`<lwdc-progress title="Progress" value=${valuesRadioKnob()}></lwdc-progress>`;
}

progressStory.storyName = 'Progress';
progressStory.parameters = { layout: 'centered' };
