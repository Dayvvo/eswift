
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box,InputGroup, InputLeftElement, Input, InputRightElement, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { PropertiesCard } from "./propertiesCard";
import { Footer } from "@/components/footer";
import { useApiUrl } from "@/hooks/useApi";
import axios from "axios";
import { LoadMore } from "@/components/LoadMore";
import Btn from "@/components/Btn";
import { Background } from "../home/Background";
import { TextHeader } from "../home/textHeader";

type properties = {
    _id:string;
    title:string;
    description:string;
    price:string;
    images:string[];
    duration:string | null;
}

const PropertiesScreen =()=> {

    const [inputValue, setInputValue] = useState<string>('')
    const [fetchData, setFetchData] = useState<properties[]>([])
    const [isLoading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    // const properties = [

    //     {
    //         id:1,
    //         title:'3 bedroom flat',
    //         pricing:'2,000,000',
    //         details:'Korem ipsum dolor sit celex dor divorless',
    //         picture:'/properties-dummy.png',
    //         duration:'annually'
    //     },
    //     {
    //         id:2,
    //         title:'3 bedroom flat',
    //         pricing:'2,000,000',
    //         details:'Non didikai ka imiss epsipass imala sookrat katostar abore ceriss katicu me ta sentende divoless ka krissas',
    //         picture:'/properties-dummy.png',
    //         duration:'annually'
    //     },
    //     {
    //         id:3,
    //         title:'3 bedroom flat',
    //         pricing:'2,000,000',
    //         details:'Non didikai ka imiss epsipass imala sookrat katostar abore ceriss katicu me ta sentende divoless ka krissas',
    //         picture:'/properties-dummy.png',
    //         duration:'annually'
    //     },
    //     {
    //         id:4,
    //         title:'3 bedroom flat',
    //         pricing:'2,000,000',
    //         details:'Non didikai ka imiss epsipass imala sookrat katostar abore ceriss katicu me ta sentende divoless ka krissas',
    //         picture:'/properties-dummy.png',
    //         duration:'annually'
    //     },
    // ]

    const toDetails = (_id: string) => {
        console.log('id', _id)
    }



    useEffect(()=> {
        const getPropertyFunction = async () => {
            setLoading(true);
            try {
            setLoading(false);
            const fetchData = await axios.get(
                `/api/property?keyword=${inputValue}&PageNumber={${page}}`
            );
            console.log(fetchData);
            setFetchData(fetchData?.data?.data);
            } catch (error) {
            setLoading(false);
            console.log(error);
            }
        };
        getPropertyFunction()

    },[page, inputValue])

    function scrollToSection() {
        const section = document.querySelector('#main') as HTMLElement;
        section.scrollIntoView({ behavior: 'smooth' });
    }


    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} header={"Find Dream Properties"}
                    details={"Explore our extensive listings of properties in Lagos and beyond"}
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/PropertiesVid.mp4"} click={scrollToSection}
                />
                <Background/>
                <Box id='main'
                    py={'120px'}
                    px={{base:'1rem',lg:'5rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                >
                    <InputGroup
                        display={'flex'} alignItems={'center'}
                        border={'1px'} borderRadius={'10px'} 
                        bg={'#E2EDF3'}
                        borderColor={'#26262630'}
                        _focusWithin={{border:'1.5px solid #3170A6'}}
                        cursor={'search'}
                        fontSize={{base:12,lg:14}} textColor={'var--(sub600)'}
                        maxW='1020px' h={{base:'52px',lg:'80px'}}
                        className="urbanist" overflow={'hidden'}
                    >
                        <Input 
                            w={'80%'} h={'100%'}
                            _placeholder={{textColor:'#666666', fontSize:{base:'10px',md:'14px',lg:'20px'}}}
                            border={'none'} _focusVisible={'none'}
                            type='search' 
                            placeholder='Search for a Property'  
                            value={inputValue}
                            onChange={(e:any) => setInputValue(e.target.value)} 
                                        
                        />
                        <InputRightElement pointerEvents="none" w={'fit-content'} h={'max-content'} mt={{base:2.5,lg:4}} mx={{base:1,lg:3}} zIndex={30}>
                            <Btn
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                W={{base:'60px',lg:'148px'}}
                                h={{base:'32px',lg:"48px"}}
                                bg={'#3170A6'}
                                borderRadius={'8px'}
                                textColor={'white'}
                                gap={'8px'}
                                _hover={{opacity:0.5}}
                                fontSize={{base:'8px', lg:'14px'}}
                            >
                                <RiSearch2Line/> Find Property
                            </Btn>
                        </InputRightElement>
                    </InputGroup>

                    <TextHeader Header={"Discover a World of Possibilities"} sub={"Our portfolio of properties is as diverse as yur dreams. Explore the following categories to find the perfect property that resonates with your vision of home"}/>

                    <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', xl:'repeat(4, 1fr)'}} 
                        gap={'20px'}
                    >
                        {
                            fetchData.map((item)=>{
                                return(
                                    <PropertiesCard key={item?._id}
                                        picture={item?.images[0]} 
                                        title={item?.title} 
                                        pricing={item?.price} 
                                        details={item?.description}
                                        id={item?._id}
                                        onClick={() => toDetails(item?._id)}
                                    />
                                )
                            })
                        }
                    </Grid>

                    <LoadMore click={()=> page + 1}/>
                    
                </Box>
                <Footer/>
            </Box>
            
        </>
    )
}

export default PropertiesScreen;