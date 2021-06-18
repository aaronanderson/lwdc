/* eslint-disable import/extensions */
import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";


import { loadWDCFonts } from '../lib/lwdc-fonts';

import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';



loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');




export const coreStory = () => {
	return html` <div class="story">
					<h3>Type Hierarchy</h3>

					<section class="wdc-type">
						<h1 class="wdc-type-data-viz-1">Data Viz 1</h1>
						<h1 class="wdc-type-data-viz-2">Data Viz 2</h1>
						<h1 class="wdc-type-h1">H1 Header</h1>
						<h2 class="wdc-type-h2">H2 Header</h2>
						<h3 class="wdc-type-h3">H3 Header</h3>
						<h4 class="wdc-type-h4">H4 Header</h4>
						<h5 class="wdc-type-h5">H5 Header</h5>
						<p class="wdc-type-body-1">
						<strong>Body 1: </strong> Tacos chartreuse raclette single-origin coffee ethical tilde
						ennui. Magna asymmetrical church-key farm-to-table dreamcatcher nisi iceland photo booth
						kitsch next level pop-up banh mi quinoa exercitation hella. Raw denim organic enim
						laboris sustainable. Polaroid occupy typewriter distillery. Kinfolk nisi man braid
						try-hard raw denim, thundercats salvia intelligentsia jean shorts officia. Heirloom
						craft beer put a bird on it occaecat
						</p>
						<p class="wdc-type-body-2">
						<strong>Body 2: </strong> Tacos chartreuse raclette single-origin coffee ethical tilde
						ennui. Magna asymmetrical church-key farm-to-table dreamcatcher nisi iceland photo booth
						kitsch next level pop-up banh mi quinoa exercitation hella. Raw denim organic enim
						laboris sustainable. Polaroid occupy typewriter distillery. Kinfolk nisi man braid
						try-hard raw denim, thundercats salvia intelligentsia jean shorts officia. Heirloom
						craft beer put a bird on it occaecat
						</p>
						<p class="wdc-type-small">
						<strong>Small: </strong> Tacos chartreuse raclette single-origin coffee ethical tilde
						ennui. Magna asymmetrical church-key farm-to-table dreamcatcher nisi iceland photo booth
						kitsch next level pop-up banh mi quinoa exercitation hella. Raw denim organic enim
						laboris sustainable. Polaroid occupy typewriter distillery. Kinfolk nisi man braid
						try-hard raw denim, thundercats salvia intelligentsia jean shorts officia. Heirloom
						craft beer put a bird on it occaecat
						</p>
					</section>

					<h3>Type Variations</h3>

					<section class="wdc-type">
						<div>
						<p class="wdc-type-variant-label">Label</p>
						<p class="wdc-type-variant-button">Button</p>
						<p class="wdc-type-variant-caps">Caps</p>
						<p class="wdc-type-variant-hint">Hint</p>
						<p class="wdc-type-variant-error">Error</p>
						<a class="wdc-type-variant-link" href="#">
							Link
						</a>
						<p class="wdc-type-variant-mono">Mono</p>
						<p class="wdc-type-variant-inverse" style="display: inline-block; background: rgb(102, 115, 128); padding: 2px 8px; border-radius: 4px; margin-top: 0px;">
							Inverse
						</p>
						</div>
					</section>
					</div>`;
}

coreStory.storyName = 'Typography';
coreStory.parameters = { layout: 'centered' };
coreStory.decorators= [withKnobs];
