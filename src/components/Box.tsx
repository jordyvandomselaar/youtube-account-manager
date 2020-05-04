import styled from "styled-components";
import {color, ColorProps, layout, LayoutProps, space, SpaceProps, variant} from "styled-system";

const Box = styled.div<LayoutProps & SpaceProps & ColorProps & {
  variant?: "container"
}>`
  ${layout}
  ${space}
  ${color}
  
  ${variant({
  variants: {
    container: {
      px: [4, "20%"]
    }
  }
})}
`;

export default Box;
