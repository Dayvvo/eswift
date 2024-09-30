import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"


export const Video =()=> {
    return (
        <>
            <Box id="video" width={"100%"}>
                <video width={'100%'} height={'100vh'} loop autoPlay>
                    <source src="/PropertiesVid.mp4" type="video/mp4"/>
                </video>
            </Box>
        </>
    )
}