import React, {FC} from "react";
import styled from "styled-components";
import {color, typography, TypographyProps, variant} from "styled-system";


export interface TextProps extends TypographyProps {
    variant?: "h1" | "h2" | "appName"
}

const Text = styled.div<TextProps>`
${typography}
${color}

${variant({
    variants: {
    }
})}
`

export default Text;
