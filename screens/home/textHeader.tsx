import { Box, Text, Image } from "@chakra-ui/react"


type props = {
    Header: string;
    sub:string;
}

export const TextHeader =({Header, sub}:props)=> {

    return(
        <Box
            w={'100%'}
            h={'fit-content'}
        >
            <Image src="/Abstract.png" alt="Abstract" w={'54px'} h={'24px'}/>
            <Text
                className="antic"
                fontWeight={400} 
                fontSize={'38px'}
                textColor={'black'}
            >
                {Header}
            </Text>
            <Text
                className="robotoF"
                fontWeight={500} 
                fontSize={'18px'}
                textColor={'#999999'}
            >
                {sub}
            </Text>
        </Box>
    )
} 