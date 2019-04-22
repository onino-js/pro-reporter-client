import * as styledComponents from "styled-components";

export interface ThemeInterface {
  primaryColor: string;
  primaryColorInverted: string;
  primary: string;
  secondary: string;
  bg_secondary: string;
  bg_primary: string;
  bg_tertiary: string;
  font_secondary: string;
  font_primary: string;
  success: string;
  warning: string;
  danger: string;
  disabled: string;
  purple: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
