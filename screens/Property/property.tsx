import { Flex, Box, Text, Input, InputGroup, InputLeftElement, Grid } from "@chakra-ui/react"
import { RiSearch2Line } from "react-icons/ri";
import Btn from "@/components/Btn";
import { IoFilter } from "react-icons/io5";
import { PropertyCard } from "./propertyCard";


export const PropertyScreen =()=> {

    const properties = [
        {
            id:1,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
        {
            id:1,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
        {
            id:1,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
        {
            id:1,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
        {
            id:1,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
        {
            id:1,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
    ]
    return(
        <>
            <Box 
                className="robotoF"
                px={{base:'16px', lg:'60px'}}
            >
                <Flex
                    my={'24px'} gap={'12px'}
                    w={'100%'} h={'36px'}
                >
                    <Flex 
                        w={'100%'}
                    >
                        <InputGroup
                            display={'flex'} alignItems={'center'}
                            border={'1px'} borderRadius={'8px'} 
                            borderColor={'var(--soft200)'}
                            cursor={'search'}
                            fontSize={14} textColor={'var--(sub600)'}
                            w='100%' h='100%'
                            _placeholder={{textColor:'var--(soft400)'}}
                        >
                            <InputLeftElement pointerEvents='none' color={'var(--soft400)'}>
                                <RiSearch2Line />
                            </InputLeftElement>
                            <Input 
                                w={'100%'} h={'100%'}
                                type='search' 
                                placeholder='Search...'            
                            />
                        </InputGroup>
                    </Flex>
                    <Btn
                        display={'flex'} gap={'4px'} alignItems={'center'} bg={'#fff'}
                        h={'100%'} w={'80px'}
                        border={'1px solid var(--soft200)'} borderRadius={'8px'}
                        textColor={'var--(sub600)'}
                        fontWeight={500} fontSize={'14px'} px={'0'} pt={'0'} pb={'0'}
                    >
                        <IoFilter className="icon"/>
                        <Text>
                            Filter
                        </Text>
                    </Btn>
                </Flex>
                <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(3, 1fr)'}} 
                    gap={{base:'24px',lg:'28px'}}
                >
                    {
                        properties.map((property)=>{
                            return(
                                <PropertyCard key={property?.id}
                                    image={property?.image} 
                                    title={property?.title} 
                                    pricing={property?.pricing} 
                                    location={property?.location}
                                    userImage={property?.userImage} 
                                    email={property?.email} 
                                    user={property?.user}
                                />
                            )
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}