import { LitElement } from "lit";
import chroma from 'chroma-js';
import colors from '@workday/canvas-colors-web';
import merge from 'lodash/merge';
import findKey from 'lodash/findKey';

//common-react/theming/breakpoints.ts
export enum BreakpointKey {
  zero = 'zero',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

export type BreakpointFnParam = BreakpointKey | keyof typeof BreakpointKey;

export type CanvasBreakpoints = {
  zero: number;
  s: number;
  m: number;
  l: number;
  xl: number;
};

export const breakpointKeys = ['zero', 's', 'm', 'l', 'xl'] as const;

export const breakpoints: CanvasBreakpoints = {
  zero: 0,
  s: 600,
  m: 960,
  l: 1280,
  xl: 1920,
};

const step = 0.5;

export function up(key: BreakpointFnParam) {
  const value = typeof breakpoints[key as BreakpointKey] === 'number' ? breakpoints[key] : key;
  return `@media (min-width:${value}px)`;
}

export function down(key: BreakpointFnParam) {
  const endIndex = breakpointKeys.indexOf(key as BreakpointKey) + 1;
  const upperbound = breakpoints[breakpointKeys[endIndex]];

  if (endIndex === breakpointKeys.length) {
    // xl down applies to all sizes
    return up(BreakpointKey.zero);
  }

  const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : 0;
  return `@media (max-width:${value - step}px)`;
}

export function between(start: BreakpointFnParam, end: BreakpointFnParam) {
  const endIndex = breakpointKeys.indexOf(end) + 1;

  if (endIndex === breakpointKeys.length) {
    return up(start);
  }

  return (
    `@media (min-width:${breakpoints[start]}px) and ` +
    `(max-width:${breakpoints[breakpointKeys[endIndex]] - step}px)`
  );
}

export function only(key: BreakpointFnParam) {
  return between(key, key);
}



//common-react/theming/theme.ts
export type CanvasThemePalette = {
  lightest: string;
  light: string;
  main: string;
  dark: string;
  darkest: string;
  contrast: string;
};

type CanvasThemeCommonPalette = {
  focusOutline: string;
};

export enum ContentDirection {
  LTR = 'ltr',
  RTL = 'rtl',
}
export interface CanvasTheme {
  palette: {
    common: CanvasThemeCommonPalette;
    primary: CanvasThemePalette;
    error: CanvasThemePalette;
    alert: CanvasThemePalette;
    success: CanvasThemePalette;
    neutral: CanvasThemePalette;
  };
  breakpoints: {
    values: CanvasBreakpoints;
    up: (key: BreakpointFnParam) => string;
    down: (key: BreakpointFnParam) => string;
    only: (key: BreakpointFnParam) => string;
    between: (start: BreakpointFnParam, end: BreakpointFnParam) => string;
  };
  direction: ContentDirection;
}



type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialCanvasTheme = RecursivePartial<CanvasTheme>;
export type PartialCanvasThemePalette = RecursivePartial<CanvasThemePalette>;


export const defaultCanvasTheme: CanvasTheme = {
  palette: {
    primary: {
      lightest: colors.blueberry100,
      light: colors.blueberry200,
      main: colors.blueberry400,
      dark: colors.blueberry500,
      darkest: colors.blueberry600,
      contrast: colors.frenchVanilla100,

      //Testing
      // lightest: colors.greenApple100,
      // light: colors.greenApple200,
      // main: colors.greenApple400,
      // dark: colors.greenApple500,
      // darkest: colors.greenApple600,
      // contrast: colors.blackPepper600,
    },
    alert: {
      lightest: colors.cantaloupe100,
      light: colors.cantaloupe300,
      main: colors.cantaloupe400,
      dark: colors.cantaloupe500,
      darkest: colors.cantaloupe600,
      contrast: colors.frenchVanilla100,
    },
    error: {
      lightest: colors.cinnamon100,
      light: colors.cinnamon200,
      main: colors.cinnamon500,
      dark: colors.cinnamon600,
      darkest: '#80160E',
      contrast: colors.frenchVanilla100,
    },
    success: {
      lightest: colors.greenApple100,
      light: colors.greenApple300,
      main: colors.greenApple600,
      dark: '',
      darkest: '',
      contrast: colors.frenchVanilla100,
    },
    neutral: {
      lightest: colors.soap200,
      light: colors.soap300,
      main: colors.soap600,
      dark: colors.licorice300,
      darkest: colors.licorice400,
      contrast: colors.frenchVanilla100,
    },
    common: {
      focusOutline: colors.blueberry400,
    },
  },
  breakpoints: {
    values: breakpoints,
    up,
    down,
    between,
    only,
  },
  direction: ContentDirection.LTR,
};


export var lwdcTheme!: CanvasTheme;

type themeChanged = (theme: CanvasTheme) => void;

//useTheme.js
export function useTheme(theme?: PartialCanvasTheme): CanvasTheme {
	//console.log(theme, lwdcTheme);
	lwdcTheme = merge({}, defaultCanvasTheme, theme) as CanvasTheme;
  document.dispatchEvent(new CustomEvent(`lwdc-theme-update`, {
    detail: {
      theme: lwdcTheme
    }
  }));
  let root = document.querySelector('body'); //document.documentElement
  if (root){
    root.style.setProperty('--lwdc-theme-primary-lightest', lwdcTheme.palette.primary.lightest);
    root.style.setProperty('--lwdc-theme-primary-light', lwdcTheme.palette.primary.light);
    root.style.setProperty('--lwdc-theme-primary-main', lwdcTheme.palette.primary.main);
    root.style.setProperty('--lwdc-theme-primary-dark', lwdcTheme.palette.primary.dark);
    root.style.setProperty('--lwdc-theme-primary-darkest', lwdcTheme.palette.primary.darkest);
    root.style.setProperty('--lwdc-theme-primary-contrast', lwdcTheme.palette.primary.contrast);
    root.style.setProperty('--lwdc-theme-common-focus-outline', lwdcTheme.palette.common.focusOutline);
  } else {
    throw Error("HTML body not found");
  }

	return lwdcTheme;
}

useTheme(defaultCanvasTheme);
