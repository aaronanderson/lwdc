/* eslint-disable import/extensions */
import { html } from 'lit-html';


import { withKnobs, text, boolean, radios, number } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import { loadWDCFonts } from '../lib/lwdc-fonts';
import { coreStyle } from '../lib/lwdc-core';
import { styleLightDOM } from '../lib/util';

import '../lib/lwdc-breadcrumbs';

loadWDCFonts();
styleLightDOM(document.body, coreStyle, 'lwdc-core');

export default {
	title: 'LitElement Workday Canvas Kit Web Components',
	//component: 'lwdc-breadcrumbs',
	decorators: [withKnobs]
};

const links = [
		{ name: "income_statement_actuals_vs_budget_ytd_with_variance",
		  href: "/income-statement-actuals-vs-budget-ytd-with-variance",
		  maxWidth: 150,
		},
		{ name: "Ledger Account is “4200: Property”",
		  href: "/ledger-account",
		},
		{ name: "Documents",
		  href: "/documents",
		},
		{ name: "2018_08_28_Annual_Recurring_Revenue",
		  href: "/2018_08_28_Annual_Recurring_Revenue",
		  maxWidth: 100,
		},
		{ name: "Policy_Type_is_Homeowners_Year_is_FY2020_Version_is_Actuals",
		  href: "/Policy_Type_is_Homeowners_Year_is_FY2020_Version_is_Actuals",
		}
];

const collapsibleBox = () => boolean("Collapsible", false);
const currentIndex = number("Current", 4, {	range: true, min: 0,	max: 4,	step: 1 });

export const breadCrumbsStory = () => {
	return html`<lwdc-breadcrumbs .current=${currentIndex} ?collapsible=${collapsibleBox()} .links=${links} @lwdc-breadcrumb-link=${(e: CustomEvent)=> console.log('Breadcrumb clicked', e.detail)}></lwdc-breadcrumbs>`;
}

breadCrumbsStory.storyName = 'Breadcrumbs';
breadCrumbsStory.parameters = { layout: 'centered' };
