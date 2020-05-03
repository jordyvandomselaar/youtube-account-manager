import styled from "styled-components";

const AppWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  
  @font-face {
     font-family: Jost;
     src: url(${require("../assets/fonts/Jost/jost-variable.ttf")}) format('woff2-variations');
     font-weight: 125 950;
     font-stretch: 75% 125%;
     font-style: oblique 0deg 12deg;
 }
`;

export default AppWrapper
