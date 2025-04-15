import "styled-components";

import colors from "./colorsDark";
import fontSize from "../default/fontSize";
import fontWeight from "../default/fontWeight";
import breakpoints from "../default/breakpoints";
import radius from "../default/radius";
import shadow from "../default/shadow";

export const darkTheme = {
  colors,
  fontSize,
  fontWeight,
  breakpoints,
  radius,
  shadow,
} as const;

declare module "styled-components" {
  export interface DefaultTheme {
    colorsDark: typeof colors;
    fontSize: typeof fontSize;
    fontWeight: typeof fontWeight;
    breakpoints: typeof breakpoints;
    radius: typeof radius;
    shadow: typeof shadow;
  }
}
