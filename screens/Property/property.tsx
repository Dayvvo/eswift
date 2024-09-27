import { Flex, Box, Text, Input, InputGroup, InputLeftElement, Grid } from "@chakra-ui/react"
import { RiSearch2Line } from "react-icons/ri";
import Btn from "@/components/Btn";
import { IoFilter } from "react-icons/io5";
import { PropertyCard } from "./propertyCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { AddPropertyScreenOne } from "./AddPropertyScreen1";
import { AddPropertyScreenTwo } from "./AddPropertyScreen2";
import { AddPropertyScreenThree } from "./AddPropertyScreen3";
import { AddPropertyScreenFour } from "./AddPropertyScreen4";
import { BsPlus } from "react-icons/bs";


export const PropertyScreen =()=> {

    const [showModal , setShowModal] = useState(false);
    const [currentChildComponent , setCurrentChildComponent] = useState<React.ReactNode | null>(null);
  
    const toggleModal =()=> {
        setShowModal ( prevState => !prevState);
    }

    const openAddPropertyScreenOne =()=> {
        setCurrentChildComponent (<AddPropertyScreenOne onClick={openAddPropertyScreenTwo}  />)
        setShowModal(true);
    }
    const openAddPropertyScreenTwo =()=> {
        setCurrentChildComponent (<AddPropertyScreenTwo onClick={openAddPropertyScreenThree}  />)
        setShowModal(true);
    }
    const openAddPropertyScreenThree =()=> {
        setCurrentChildComponent (<AddPropertyScreenThree onClick={openAddPropertyScreenFour}  />)
        setShowModal(true);
    }
    const openAddPropertyScreenFour =()=> {
        setCurrentChildComponent (<AddPropertyScreenFour onClick={toggleModal}  />)
        setShowModal(true);
    }
    
    const [getProperty, setGetProperty] = useState([]);
    const [page, setPage] = useState(1)
    const [inputValue, setInputValue] = useState();


    useEffect(()=> {
        axios.get('/api/property/:id')
        .then((res:any) => {
                console.log(res);
            } 
        )
        .catch((err: any) => {
            console.log(err)
            }
        )
    },[]);

    useEffect(()=> {
        axios.get('/api/property?keyword=for&PageNumber={page}')
        .then((res:any) => {
                console.log(res);
            } 
        )
        .catch((err: any) => {
            console.log(err)
            }
        )
    },[page]);
    
   



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
    ];
    
    return(
        <>  
            <Modal onClose={toggleModal}
                isVisible={showModal}
            >
                {currentChildComponent}
            </Modal>
            <Box 
                className="robotoF"
                px={{base:'16px', lg:'0'}}
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
                                value={inputValue}
                                onChange={(e:any) => setInputValue(e.target.value)} 
                                         
                            />
                        </InputGroup>
                    </Flex>
                    <Btn onClick={()=> setPage(inputValue)}
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
                    <Btn onClick={openAddPropertyScreenOne}
                        display={'flex'} gap={'4px'} alignItems={'center'} bg={'#fff'}
                        h={'100%'} w={'80px'}
                        border={'1px solid var(--soft200)'} borderRadius={'8px'}
                        textColor={'var--(sub600)'}
                        fontWeight={500} fontSize={'14px'} px={'0'} pt={'0'} pb={'0'}
                    >
                        <BsPlus className="icon"/>
                        <Text>
                            Add
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
                                    count={page}
                                />
                            )
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}