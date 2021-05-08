import {LitElement, CSSResult, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';



import './lwdc-icon';

import { CanvasIcon } from '@workday/design-assets-types';

// @ts-ignore
import { getColor } from '@workday/canvas-kit-css-icon/lib/utils.js';

import styleCSS from './lwdc-status-indicator.scss';
const style = css([`${styleCSS}`] as any) as CSSResult;

//git diff HEAD 'HEAD@{2020-04-18}' -- modules/status-indicator/react/lib/StatusIndicator.tsx


@customElement('lwdc-status-indicator')
export class StatusIndicatorElement extends LitElement {

	@property({ type: Object })
	type: StatusIndicatorType = StatusIndicatorType.Gray;

	@property({ type: Object })
	emphasis: StatusIndicatorEmphasis = StatusIndicatorEmphasis.High;

	@property({ type: Object })
	icon?: CanvasIcon;

	@property({ type: String, attribute: true, reflect: true })
	label: string = '';

	static get styles() {
		return [style];
	}

	render() {
		let variant = variants[this.type][this.emphasis];
		let color = variant['color'];
		let colorColor = getColor(variant['color']);
		let background = variant['background'];
		let backgroundColor = getColor(variant['background']);

		//this may not be efficient
		this.style.setProperty('--lwdc-status-indicator-color', colorColor);
		this.style.setProperty('--lwdc-status-indicator-background', backgroundColor);

		return html`		
		<span class="lwdc-status-indicator-container">
			${this.icon ? html`<lwdc-icon size="14" .icon=${this.icon} .color=${color} .colorHover=${color} .backgroundHover=${background} ></lwdc-icon>` : undefined}
			<span class="lwdc-status-indicator-label">${this.label}</span>
		</span>
		`;
	}

}

export enum StatusIndicatorType {
	Gray = 'gray',
	Orange = 'orange',
	Blue = 'blue',
	Green = 'green',
	Red = 'red',
	Transparent = 'transparent',
}

export enum StatusIndicatorEmphasis {
	High = 'high',
	Low = 'low',
}

const variants = {
	gray: {
		high: {
			color: 'frenchVanilla100',
			background: 'licorice300',
		},
		low: {
			color: 'licorice400',
			background: 'soap200',
		},
	},
	orange: {
		high: {
			color: 'licorice500',
			background: 'cantaloupe400',
		},
		low: {
			color: 'toastedMarshmallow600',
			background: 'cantaloupe100',
		},
	},
	blue: {
		high: {
			color: 'frenchVanilla100',
			background: 'blueberry400',
		},
		low: {
			color: 'blueberry500',
			background: 'blueberry100',
		},
	},
	green: {
		high: {
			color: 'frenchVanilla100',
			background: 'greenApple600',
		},
		low: {
			color: 'greenApple600',
			background: 'greenApple100',
		},
	},
	red: {
		high: {
			color: 'frenchVanilla100',
			background: 'cinnamon500',
		},
		low: {
			color: 'cinnamon600',
			background: 'cinnamon100',
		},
	},
	transparent: {
		high: {
			color: 'frenchVanilla100',
			background: 'blackPepper600',
		},
		// Low & High emphasis are identical for transparent status indicators
		low: {
			color: 'frenchVanilla100',
			background: 'blackPepper600',
		},
	},
};

export default StatusIndicatorElement;







