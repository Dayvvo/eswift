import { Box, Flex, Text } from "@chakra-ui/react"
import { TbCurrencyNaira } from "react-icons/tb";
import Image from "next/image"
import router from "next/router";

type PropertiesCardProps = {
    picture?:string;
    title?:string;
    pricing?:string;
    duration?:string | null;
    details?:string;
    id:string;
}

export const PropertiesCard =({
    picture, title, pricing, duration, details,id
}:PropertiesCardProps) => {

    const Navigate = () => {
        router.push(`/properties/${id}`)
    }

    return(
        <>
            <Box onClick={Navigate}
                className="roboto"
                bg={'#FFF'}
                maxW={'295px'} h={'400px'}
                pb={'1px'} boxShadow={'lg'}
                overflow={'hidden'}
            >
                <Flex
                    position={'relative'}
                    w='100%' h='295px' 
                >
                    <Image 
                        width={1000} height={1000}
                        layout="responsive"
                        src={`${picture}`} 
                        alt={'property'}
                    />
                </Flex>
                <Flex  
                    className="roboto"
                    flexDir={'column'} gap={'8px'}
                    w={'100%'} 
                    mt={'8px'} 
                    px={2}
                >
                    <Flex  
                        w={'100%'}
                        justifyContent={'space-between'} 
                        alignItems={'center'} textColor={'#000'}
                    >
                        <Text
                            fontSize={{base:'14px', lg:'14px'}} 
                            fontWeight={400}
                        >
                            {title}
                        </Text>
                        <Text
                            display={'flex'} alignItems={'center'}
                            fontSize={{base:'14px', lg:'14px'}} 
                            fontWeight={400}
                        >
                            <TbCurrencyNaira /> 
                            {pricing}/
                            <Text mt={1} as={'span'} fontWeight={400} fontSize={'10px'}>
                                {duration}
                            </Text>
                        </Text>
                    </Flex>          
                </Flex>
                <Text mt={3} fontSize={'12px'} fontWeight={400} textColor={'#3A314880'} px={2} className="roboto">
                    {details}
                </Text>
            </Box>
        </>
    )
}