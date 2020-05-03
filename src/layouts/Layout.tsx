import React, {FC} from "react";
import Grid from "../components/Grid";
import Text from "../components/Text";
import Flex from "../components/Flex";
import Box from "../components/Box";
import Head from "next/head";

export interface LayoutProps {

}

const Layout: FC<LayoutProps> & {
    SiteName: FC,
    PageTitle: FC<{ title: string }>,
    Content: FC
} = ({children}) => {
    return (
        <Grid height="100%" gridTemplateColumns="repeat(3, 1fr)" gridTemplateRows="63px 1fr" display="grid">
            {children}
        </Grid>
    );
};


Layout.SiteName = () => (
    <Grid gridColumn={1} gridRow={1}>
        <Text as="span" variant="appName">Youtube Account Manager</Text>
    </Grid>
)

Layout.PageTitle = ({title}) => (
    <>
        <Head>
            <title>Youtube Account Manager | {title}</title>
        </Head>
        <Grid gridColumn={2} gridRow={1}>
            <Flex justifySelf="center">
                <Text textAlign="center" variant="h1" as="h1">{title}</Text>
            </Flex>
        </Grid>
    </>
)

Layout.Content = ({children}) => (
    <Grid gridRow={2} gridColumn="1 / span 3">
        <Box pt="50px">
            {children}
        </Box>
    </Grid>
)

export default Layout;
