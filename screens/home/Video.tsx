import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"


export const Video =()=> {
    return (
        <>
            <Box id="video" width={"100%"}
            >
                <Image src={''} alt="/" 
                        width={200}
                        height={200}
                />
            </Box>
        </>
    )
}