import React, {FC} from "react";
import styled from "styled-components";
import {color, typography, TypographyProps, variant, space, ColorProps, SpaceProps} from "styled-system";


export interface TextProps extends TypographyProps, ColorProps, SpaceProps {
    variant?: "h1" | "h2" | "appName" | "p"
}

const Text = styled.p<TextProps>`
${typography}
${color}
${space}

${variant({
    variants: {
        appName: {
            fontFamily: "primary",
            fontSize: "1.5rem"
        },
        h1: {
            fontFamily: "primary"
        },
        h2: {
            fontFamily: "primary"
        },
        p: {
            fontFamily: "primary"
        }
    }
})}
`

Text.defaultProps = {
    variant: "p"
}

export default Text;
