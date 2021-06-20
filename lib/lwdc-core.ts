import styleCSS from './lwdc-core.scss';
import { css, CSSResult, CSSResultArray } from 'lit';

export const coreStyle = (css([`${styleCSS}`] as any)  as CSSResultArray[0]) as CSSResult;

export default coreStyle;
