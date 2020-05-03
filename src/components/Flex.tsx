import styled, {css} from "styled-components";
import {flex, flexbox, FlexboxProps, FlexProps} from "styled-system";

const Flex = styled.div<FlexProps & FlexboxProps>`
width: 100%;
height: 100%;
${flex}
${flexbox}

${props => props.flexDirection && css`display: flex;`}
`

export default Flex;
