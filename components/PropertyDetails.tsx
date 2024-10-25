"use client";
import React from 'react';
import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  Image,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaRegImages } from "react-icons/fa";
import useProperty from "@/hooks/useProperty";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { R } from "@/utils/types";
import { PropertyCard } from '@/screens/Property/PropertyCard';
import { useRouter } from 'next/router';


export const PropertyDetails = ({clientView}:{clientView?:boolean}) => {
   
    const Features: any[] = [
    {
        id: 1,
        key: "Spacious living area with ample natural light",
    },
    {
        id: 2,
        key: "Modern kitchen with stainless steel appliances",
    },
    {
        id: 3,
        key: "3 generously sized bedrooms",
    },
    {
        id: 4,
        key: "2 well-appointed bathrooms.",
    },
    {
        id: 5,
        key: "Spacious living area with ample natural light",
    },
    {
        id: 6,
        key: "Spacious living area with ample natural light",
    },
    ];
    const Documents: any[] = [
    {
        id: 1,
        doc: "/",
    },
    {
        id: 2,
        doc: "/",
    },
    {
        id: 3,
        doc: "/",
    },
    {
        id: 4,
        doc: "/",
    },
    {
        id: 5,
        doc: "/",
    },
    ];
    const properties: any[] = [
    {
        id: 1,
        title: "3 bedroom flat",
        pricing: "2,000,000",
        location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
        email: "Dominic@gmail.com",
        user: "Miss Dominic Tromp",
        userImage: "/userImage.png",
        image: "/prop-img.png",
    },
    {
        id: 2,
        title: "3 bedroom flat",
        pricing: "2,000,000",
        location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
        email: "Dominic@gmail.com",
        user: "Miss Dominic Tromp",
        userImage: "/userImage.png",
        image: "/prop-img.png",
    },
    {
        id: 3,
        title: "3 bedroom flat",
        pricing: "2,000,000",
        location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
        email: "Dominic@gmail.com",
        user: "Miss Dominic Tromp",
        userImage: "/userImage.png",
        image: "/prop-img.png",
    },
    ];

    const { globalContext } = useAppContext();

    const { user } = globalContext;

    const [detailsData, setDetailsData] = useState<any>(null);

    const { getPropertyDetails } = useProperty();

    const {query, isReady} = useRouter();


    useEffect(() => {
        if(isReady){
            (
                async () => {
                    try {
                        const request = await getPropertyDetails(query?.id as string);
                        const data = request.data as R;
                        setDetailsData(data?.data);
                    } 
                    catch (err) {
                        console.log(err);
                    }
                }
            )()
        };
    }, [isReady]);

    console.log('property details', query?.id );

    const isAdmin = user?.role === 'Admin'

    return (
            <Box
                bg={'#FFF'} 
                w={ clientView? '80%': '100%'}
            >
                {
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
                                borderRadius={'8px'} gap={'16px'} m='1em'
                                className="robotoF" textColor={'#03142B'}
                                fontWeight={500} fontSize={{base:'18px', lg:'30px'}}
                            >

                                <Text cursor={'pointer'} onClick={()=>{}}>View Gallery</Text>
                                <FaRegImages />
                            </Flex>
                        </Flex>
                    </Flex>
                }
                <Flex 
                    flexDir={'column'}
                    w={'100%'} p={'20px'}
                    gap={'24px'}
                >
                        <Flex 
                            flexDir={'column'}
                            w={'100%'} gap={'18px'}
                            className="roboto"
                        >
                            <Flex w='100%' justify={'space-between'}>
                                <Flex
                                    fontSize={{base:'20px', lg:'28px'}} 
                                >
                                    <HiOutlineLocationMarker />
                                    <Text>
                                        {detailsData?.address}
                                    </Text>
                                </Flex>

                                <Btn
                                    display={'flex'} alignItems={'center'} justifyContent={'center'}
                                    bg={'#3170A6'} borderRadius={'6px'} px='2em' h={'48px'}
                                    textColor={'#FFF'} fontWeight={500} className="roboto"
                                    fontSize={'16px'}
                                
                                >
                                    Contact us
                                </Btn>

                            </Flex>

                            <Text
                                textColor={'#626871'} fontWeight={400}
                                fontSize={'18px'} className="roboto"
                            >
                                {detailsData?.description}
                            </Text>
                            <Box
                                fontSize={'18px'} fontWeight={300} textColor={'#626871'}
                            >
                                <Text >
                                    Key Features
                                </Text>
                                {
                                    detailsData?.features.map((feature:string,key:number)=>{
                                        return(
                                            <Flex key={feature+key}
                                                alignItems={'center'} gap={'4px'}
                                            >
                                                <BsDot />
                                                <Text>
                                                    {feature}
                                                </Text>
                                            </Flex>
                                        )
                                    })
                                }
                            </Box>
                            { 
                                isAdmin ?
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
                                </Flex> : null
                            }
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
                    
                        { 
                            isAdmin ?
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
                            :
                            null
                        }     
                    </Flex>
            
                    { isAdmin ?
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
                        :
                        null
                    }

            </Box>
        
    )
}
