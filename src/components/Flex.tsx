import styled, {css} from "styled-components";
import {flex, flexbox, FlexboxProps, FlexProps} from "styled-system";

const Flex = styled.div<FlexProps & FlexboxProps>`
${flex}
${flexbox}

${props => props.flexDirection && css`display: flex;`}
`

export default Flex;
