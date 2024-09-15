import Btn from "@/components/Btn";
import { Box, Flex, Grid, GridItem, SimpleGrid, Text, Image } from "@chakra-ui/react"
import { BsDot } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCurrencyNaira } from "react-icons/tb"
import { FaRegImages } from "react-icons/fa";
import { PropertyCard } from "./propertyCard";

export const PropertyDetails =()=> {
    const Features: any[] = [
        {
            id:1,
            key: 'Spacious living area with ample natural light'
        },
        {
            id:2,
            key: 'Modern kitchen with stainless steel appliances'
        },
        {
            id:3,
            key: '3 generously sized bedrooms'
        },
        {
            id:4,
            key: '2 well-appointed bathrooms.'
        },
        {
            id:5,
            key: 'Spacious living area with ample natural light'
        },
        {
            id:6,
            key: 'Spacious living area with ample natural light'
        }
    ]
    const Documents:any[] = [
        {
            id:1,
            doc:'/'
        },
        {
            id:2,
            doc:'/'
        },
        {
            id:3,
            doc:'/'
        },
        {
            id:4,
            doc:'/'
        },
        {
            id:5,
            doc:'/'
        },
    ]
    const properties:any[] = [
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
            id:2,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
        {
            id:3,
            title:'3 bedroom flat',
            pricing:'2,000,000',
            location:'12, Osinowo estate Gbagada, Lagos, Nigeria',
            email:'Dominic@gmail.com',
            user:'Miss Dominic Tromp',
            userImage:'/userImage.png',
            image:'/prop-img.png',
        },
    ]
    return (
        <>
            <Box
                bg={'#FFF'} 
                w={'100%'}
            >
                <Flex w={'100%'} my={'24px'} pos={'relative'}
                >
                    <Grid templateColumns={'repeat(2, 1fr)'} gap={'16px'} 
                        w={'100%'} h={'max-content'}
                    >
                        <GridItem rowSpan={2}>
                            <Image w={'100%'} h={'100%'} src={`/Grid-1.png`} alt={``}/>
                        </GridItem>
                        <GridItem rowSpan={1}>
                            <Image w={'100%'} src={`/Grid-2.png`} alt={``} />
                        </GridItem>
                        <GridItem  rowSpan={1}>
                            <Image w={'100%'}  src={`/Grid-2.png`} alt={``} />
                        </GridItem>
                    </Grid>
                    <Flex w={'100%'} pos={'absolute'} justifyContent={'end'} insetBlockEnd={0}>
                        <Flex cursor={'pointer'}
                            bg={'#FFF'} alignItems={'center'} justifyContent={'center'}
                            w={'250px'} h={{base:'48px',lg:'60px'}}
                            borderRadius={'8px'} gap={'16px'}
                            className="robotoF" textColor={'#03142B'}
                            fontWeight={500} fontSize={{base:'18px', lg:'30px'}}
                        >
                            <Text>View Gallery</Text>
                            <FaRegImages />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex 
                    flexDir={'column'}
                    w={'100%'} p={'20px'}
                    gap={'24px'}
                >
                    <Flex
                        flexDir={{base:'column', lg:'row'}}
                        className="montserrat"
                        w={'100%'} alignItems={{base:'',lg:'center'}} 
                        justifyContent={'space-between'} 
                        fontWeight={600} textColor={'#000'}
                        fontSize={'40px'}
                    >
                        <Text 
                            fontSize={'40px'}
                        >
                            3 Bedroom flat in Gbagada
                        </Text>
                        <Text 
                            fontWeight={500} display={'flex'} alignItems={'center'}
                        >
                            <TbCurrencyNaira/><Text as={'span'}>
                                2,000,000
                            </Text>
                        </Text>
                    </Flex>
                    <Flex
                        flexDir={{base:'column', lg:'row'}}
                        w={'100%'} justifyContent={'space-between'} gap={'26px'}
                    >
                        <Flex 
                            flexDir={'column'}
                            w={'100%'} gap={'18px'}
                            className="roboto"
                        >
                            <Flex
                                w={'100%'}
                                alignItems={{base:'start', md:'center'}} gap={'4px'}
                                textColor={'#626871'} fontWeight={400}
                                fontSize={{base:'20px', lg:'28px'}} 
                            >
                                <HiOutlineLocationMarker />
                                <Text>
                                    12, Osinowo estate Gbagada, Lagos, Nigeria
                                </Text>
                            </Flex>
                            <Text
                                textColor={'#626871'} fontWeight={400}
                                fontSize={'18px'} className="roboto"
                            >
                                Discover your urban oasis in this modern 3-bedroom apartment located in the heart of Gbagada. 
                                Enjoy breathtaking city views, luxurious amenities, and a prime location.
                            </Text>
                            <Box
                                fontSize={'18px'} fontWeight={300} textColor={'#626871'}
                            >
                                <Text >
                                    Key Features
                                </Text>
                                {
                                    Features.map((feature)=>{
                                        return(
                                            <Flex key={feature?.id}
                                                alignItems={'center'} gap={'4px'}
                                            >
                                                <BsDot />
                                                <Text>
                                                    {feature?.key}
                                                </Text>
                                            </Flex>
                                        )
                                    })
                                }
                            </Box>
                            <Flex
                                bg={'var(--weak50)'}
                                w={'100%'} alignItems={'center'}
                                px={'20px'} py={'6px'} className="robotoF"
                            >
                                <Text
                                    fontSize={'12px'} fontWeight={500}
                                    textColor={'var(--soft400)'}
                                >
                                    DOCUMENTS
                                </Text>
                            </Flex>
                            <SimpleGrid columns={{base:1, md:2, lg:3}} gap={6}>
                                {   
                                    Documents.map((document) => {
                                        return(
                                            <Flex key={document?.id}
                                                alignItems={'center'} position={'relative'}
                                                borderRadius={'8.5px'} border={'0.71px solid var(--soft200)'}
                                                px={'10px'} w={'100%'} h={'52px'}
                                            >
                                                <Btn pos={'absolute'} bg={'transparent'} display={'flex'}
                                                    w={'38px'} h={'24px'} alignItems={'center'} borderRadius={'6px'}
                                                    border={'0.71px solid var(--soft200)'} className="inter" 
                                                    textColor={'var(--sub600)'} fontSize={'10px'} fontWeight={500}
                                                    insetEnd={4}
                                                >
                                                    View
                                                </Btn>
                                            </Flex>
                                        )}
                                    )
                                }
                            </SimpleGrid>
                        </Flex>
                        <Flex
                            flexDir={'column'}
                            w={{base:'100%', lg:'20%'}}
                            gap={'16px'} className="robotoF"
                        >
                            <Btn
                                bg={'transparent'} 
                                display={'flex'} justifyContent={'center'} alignItems={'center'}
                                w="100%" border="1px solid var(--primaryBase)" borderRadius={'10px'}
                                h={'40px'} textColor={'var(--primaryBase)'}
                            >
                                Resume
                            </Btn>
                            <Btn
                                bg={'transparent'} 
                                display={'flex'} justifyContent={'center'} alignItems={'center'}
                                w="100%" border="1px solid var(--errorBase)" borderRadius={'10px'}
                                h={'40px'} textColor={'var(--errorBase)'}
                            >
                                Delete
                            </Btn>
                            <Flex
                                bg={'var(--weak50)'}
                                w={'100%'} alignItems={'center'}
                                px={'20px'} py={'6px'} className="robotoF"
                            >
                                <Text
                                    fontSize={'12px'} fontWeight={500}
                                    textColor={'var(--soft400)'}
                                >
                                    USER
                                </Text>
                            </Flex>
                            <Flex flexDir={'column'} gap={'16px'}
                                w={'100%'} p={'20px'} className="robotoF"
                            >
                                <Flex alignItems={'center'} gap={4}>
                                    <Box
                                        overflow={'hidden'}
                                        borderRadius={'100%'} h={'40px'} w={'42px'}
                                    >
                                        <Image width={42} height={40}
                                            src={'/profile.png'} alt=""
                                        />
                                    </Box>
                                    <Text 
                                        fontWeight={500} fontSize={'18px'}
                                    >
                                        John Doe
                                    </Text>
                                </Flex>
                                <Box 
                                   textColor={'#626871'}
                                   fontWeight={500}
                                >
                                    <Text mb={'4px'}
                                        textColor={'var(--soft400)'}
                                        fontSize={'12px'}
                                    >
                                        EMAIL
                                    </Text>
                                    <Text fontSize={'14px'}>
                                        Johndoe@gmail.com
                                    </Text>
                                </Box>
                                <Flex 
                                    w={'100%'}
                                    gap={'28px'}
                                >
                                    <Box 
                                        textColor={'#626871'}
                                        fontWeight={500}
                                    >
                                        <Text mb={'4px'}
                                            textColor={'var(--soft400)'}
                                            fontSize={'12px'}
                                        >
                                            PHONE NO.
                                        </Text>
                                        <Text fontSize={'14px'}>
                                            08123456786
                                        </Text>
                                    </Box>
                                    <Box 
                                        textColor={'#626871'}
                                        fontWeight={500}
                                    >
                                        <Text mb={'4px'}
                                            textColor={'var(--soft400)'}
                                            fontSize={'12px'}
                                        >
                                            USER TYPE
                                        </Text>
                                        <Text fontSize={'14px'}>
                                            Affiliate
                                        </Text>
                                    </Box>
                                </Flex>
                                <Box 
                                    textColor={'#626871'}
                                    fontWeight={500}
                                >
                                    <Text mb={'4px'}
                                        textColor={'var(--soft400)'}
                                        fontSize={'12px'}
                                    >
                                        PROPERTY
                                    </Text>
                                    <Text fontSize={'14px'}>
                                        2
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex 
                    w={'100%'} justifyContent={'center'}
                    gap={{base:'24px',lg:'28px'}}
                    flexWrap={'wrap'}
                    mt={{base:'60px',lg:'120px'}}
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
                </Flex>
            </Box>
        </>
    )
}