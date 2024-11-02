import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import router from "next/router";
import { MdLocationOn } from "react-icons/md";
import Btn from "@/components/Btn";
import { properties } from "@/utils/types";

type PropertiesCardProps = {
    picture?:string;
    title?:string;
    pricing?:string;
    location?:string;
    details?:string;
    address:string;
    id:string;
}

interface propertiesCard extends properties{
    view?:'client' | 'admin'
    onClick?: () => void;

}

export const PropertiesCard =({
    images, title, price, description, address, _id, onClick, view
}:propertiesCard) => {

    const Navigate = () => {
        router.push(`/properties/${_id}`)
    }


    return(
        <>
            <Box onClick={view==='client'? Navigate: onClick}
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
                     src={`${images[0]}`} 
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
                            {address}
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
                        <Text h={'48px'} overflow={'hidden'}  textOverflow={'ellipsis'} fontSize={'16px'} fontWeight={500} textColor={'#999999'} className="roboto">
                            {description}
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
                            {price}
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
                        className="robotoF" fontSize={{base:'10px', xl:'14px'}} fontWeight={500}
                    >
                        View Properties Details
                    </Btn>

                </Flex>
                        
            </Box>
        </>
    )
}