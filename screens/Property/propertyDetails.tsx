import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import Image from "next/image"

export const PropertyDetails =()=> {
    return (
        <>
            <Box
                bg={'#FFF'} 
                w={'100%'}
                minH={'!00vh'}
            >
                <Flex w={'100%'} h={'488px'} >
                    <Grid templateColumns={'repeat(2 1fr)'} gap={'16px'}>
                        <GridItem rowSpan={2} colSpan={1}>
                            <Image width={1000} height={1000} src={`/Grid-1.png`} alt={``} layout="responsive"/>
                        </GridItem>
                        <GridItem colSpan={1}>
                        <Image width={1000} height={1000} src={`/Grid-2.png`} alt={``} layout="responsive"/>
                        </GridItem>
                        <GridItem colSpan={1}>
                        <Image width={1000} height={1000} src={`/Grid-2.png`} alt={``} layout="responsive"/>
                        </GridItem>
                    </Grid>
                </Flex>
            </Box>
        </>
    )
}