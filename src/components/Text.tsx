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
            fontSize: "1.5rem",
            textDecoration: "none",
            color: "primary"
        },
        h1: {
            fontFamily: "primary",
            color: "primary"
        },
        h2: {
            fontFamily: "primary",
            color: "primary"
        },
        p: {
            fontFamily: "primary",
            color: "primary"
        }
    }
})}
`

Text.defaultProps = {
    variant: "p"
}

export default Text;
