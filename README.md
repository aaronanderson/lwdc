**Workday® is the registered trademark of Workday, Inc. This project is not affiliated with Workday, Inc. and Workday, Inc. does not endorse this project.**

# lwdc

Provides [LitElement](https://lit-element.polymer-project.org/) web components for [Workday Canvas Kit](https://github.com/Workday/canvas-kit) UI components. 

The purpose of these components are:

* Fully leverage the modern native web platform including [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [HTML Templates](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) via LitElement eliminating the need for complicated and archaic VDOM frameworks

* Wrap the Canvas Kit CSS components to reduce boilerplate code and typos

* Offer alternatives to Canvas Kit React components that do not have CSS equivalents

* Provide Javascript functionality such as dynamic styling and selection

* Plug into HTML form validation

[React](https://reactjs.org/) based applications would benefit from the direct usage of the React components included in Canvas Kit. Web Component based applications can easily include these components or wrap the React components using [PReact](https://preactjs.com/) as demonstrated [here](https://github.com/aaronanderson/lit-react).

New collaborators or contributors are welcome.

## Styling

Logically each Canvas Kit component should be wrapped as a LitElement web component. However some of the Canvas Kit component utilize descendant CSS selectors that are unable to pierce web component shadow DOMs.  For example, [error.scss](https://github.com/Workday/canvas-kit/blob/master/modules/common/css/lib/errors.scss) defines `wdc-form-error` at the form field level and has descendant selectors for text and select inputs. There are three potential solutions to this issues:

* Add CSS selectors to parent elements for [::slotted](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted) and [::part](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)

* Add CSS selectors to child elements for  [:host-context()](https://developer.mozilla.org/en-US/docs/Web/CSS/:host-context())

* Forego the use of the Shadow DOM and create elements in the Light DOM.

The Light DOM option was used for select components. The ::slotted and ::part solution would require upstream changes to Canvas Kit SCSS or a large amount of forked SCSS to replicate [SCSS parent selectors](https://sass-lang.com/documentation/style-rules/parent-selector). Likewise the :host-context() solution would require advanced introspection of the SCSS and targeted CSS for child components. Due to the complex nature of the comobox component it does use the Shadow DOM and has [CSS selectors](lib/lwdc-combobox.scss) specifically for error highlighting.  

The form related web components are added to the Light DOM and their styles are individually added to the closest shadow DOM or document. Typically form components will be wrapped by another custom element or the provided [lwdc-form](lib/lwdc-form.ts) element so the styles will have some isolation and not excessive duplication. 

## Browser Support

The LitElement components utilize two experimental browser features:

* [Constructable Stylesheets](https://developers.google.com/web/updates/2019/02/constructable-stylesheets)

* [Form Associated Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example)

The current version of Chrome supports both of these features without any extra configuration. Firefox support is evolving:

* [form associated custom elements issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1552327)

* [constructable style sheets issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1520690)

Partial form associated custom element support can be activated in the latest version of Firefox via the  `dom.webcomponents.elementInternals.enabled` setting in `about:config`

A minimal pollyfill is used to provide the missing form associated element features in Firefox in order to perform full form validation.

## Storybook

Build the components: `yarn install` then `yarn build`

Build the Storybook: `yarn build-storybook`

Run the Storybook: `yarn start`

## Usage

`yarn add @aaronanderson/lwdc`


## Development
Local testing can be performed by checking this project out, running `npm link` in the checked out directory, and then running `npm link @aaronanderson/lwdc` in the target project.

Alternatively run `yarn pack` in the checked out directory and then run `yarn remove @aaronanderson/lwdc`, `yarn cache clean`, `yarn add file:aaronanderson-lwdc-v1.0.0.tgz`  in the target project to install the latest version.


