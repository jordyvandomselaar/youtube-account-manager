import React, {FC} from "react";
import Grid from "../components/Grid";
import Text from "../components/Text";
import Flex from "../components/Flex";
import Box from "../components/Box";
import Head from "next/head";
import Link from "next/link";

export interface LayoutProps {

}

const Layout: FC<LayoutProps> & {
    SiteName: FC,
    PageTitle: FC<{ title: string }>,
    Content: FC
} = ({children}) => {
    return (
        <Grid height="100%" gridTemplateColumns="repeat(3, 1fr)" gridTemplateRows={[, "63px 1fr"]} display="grid"
              gridAutoRows={["min-content", false]}>
            {children}
        </Grid>
    );
};


Layout.SiteName = () => (
    <Grid gridColumn={["1/span 3", 1]} gridRow={1}>
        <Box height="100%" ml={[0, 3]} mb={[4, 0]} mt={[3, 0]}>
            <Flex flexDirection="row" alignItems="center"
                  justifyContent={["center", "flex-start"]}
            >
                <Link href="/">
                    <Text
                        as="a"
                        href="/"
                        variant="appName">Youtube Account Manager
                    </Text>
                </Link>
            </Flex>
        </Box>
    </Grid>
)

Layout.PageTitle = ({title}) => (
    <>
        <Head>
            <title>Youtube Account Manager | {title}</title>
        </Head>
        <Grid gridColumn={2} gridRow={[2, 1]}>
            <Flex justifySelf="center">
                <Box height="100%">
                    <Flex flexDirection="row" alignItems="center" justifyContent="center">
                        <Text m={0} variant="h1" as="h1">{title}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Grid>
    </>
)

Layout.Content = ({children}) => (
    <Grid gridRow={[3, 2]} gridColumn="1 / span 3">
        <Box pt="50px">
            {children}
        </Box>
    </Grid>
)

export default Layout;
