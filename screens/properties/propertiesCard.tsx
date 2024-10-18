import { Box, Flex, Text } from "@chakra-ui/react"
import { TbCurrencyNaira } from "react-icons/tb";
import Image from "next/image"
import router from "next/router";
import { MdLocationOn } from "react-icons/md";
import Btn from "@/components/Btn";

type PropertiesCardProps = {
    picture?:string;
    title?:string;
    pricing?:string;
    location?:string;
    details?:string;
    id:string;
    onClick?: () => void;
}

export const PropertiesCard =({
    picture, title, pricing, details, location, id, onClick
}:PropertiesCardProps) => {

    // const Navigate = () => {
    //     router.push(`/properties/${id}`)
    // }

    return(
        <>
            <Box onClick={onClick}
                className="roboto"
                bg={'#FFF'}
                maxW={'400px'} h={'fit-content'}
                p={{base:'14px',sm:'20px'}} borderRadius={'12px'}
                border={'1px solid #262626'} 
                overflow={'hidden'}
                cursor={'pointer'}
            >
                <Flex
                    position={'relative'}
                    w='100%' h='250px' 
                    borderRadius={'10px'}
                    overflow={'hidden'}
                >
                    <Image 
                        width={1000} height={1000}
                        layout="responsive"
                        src={`${picture}`} 
                        alt={'property'}
                    />
                </Flex>
                <Flex  
                    className="robotoF"
                    flexDir={'column'} gap={'16px'}
                    w={'100%'} 
                    my={'24px'} 
                >
                    <Flex 
                        w={'100%'}
                        h={'32px'}
                        alignItems={'center'}
                        px={'12px'} borderRadius={'28px'}
                        border={'1px solid #262626'} gap={'4px'}
                        textColor={'black'} fontSize={'16px'}
                        className="robotoF" fontWeight={500}
                    >
                        <MdLocationOn />
                        <Text fontSize="14px" maxW={'90%'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                            {location}
                        </Text>
                    </Flex>
                    <Flex  
                        flexDir={'column'}
                        w={'100%'} 
                        textColor={'#191919'}
                    >
                        <Text
                            fontSize={{base:'20px', lg:'20px'}} 
                            fontWeight={600}
                        >
                            {title}
                        </Text>
                        <Text h={'48px'} overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} fontSize={'16px'} fontWeight={500} textColor={'#999999'} className="roboto">
                            {details}
                        </Text>
                    </Flex>          
                </Flex>
                <Flex 
                    w={'100%'} 
                    justifyContent={'space-between'}
                    alignItems={'end'}
                    gap={'10px'} className="robotoF"
                >
                    <Flex 
                        flexDir={'column'}
                        justifyContent={'space-between'}
                    >
                        <Text fontWeight={500} fontSize={'14px'} textColor={'#999999'}>
                            Price
                        </Text>
                        <Text
                            display={'flex'} alignItems={'center'}
                            fontSize={'20px'} 
                            fontWeight={600} textColor={'#191919'}
                        >
                            <TbCurrencyNaira /> 
                            {pricing}
                        </Text>
                    </Flex>
                    <Btn onClick={onClick}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        maxW={'208px'}
                        h="48px"
                        bg={'#3170A6'}
                        borderRadius={'8px'}
                        textColor={'white'}
                        className="robotoF" fontSize={{base:'10px',md:'14px'}} fontWeight={500}
                    >
                        View Properties Details
                    </Btn>

                </Flex>
                        
            </Box>
        </>
    )
}