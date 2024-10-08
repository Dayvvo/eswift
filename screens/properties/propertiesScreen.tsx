
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

type properties = {
    id:string;
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


    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} Nav={"/properties/#main"} header={"Find Dream Properties"} 
                    details={"Explore our extensive listings of properties in Lagos and beyond"} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/PropertiesVid.mp4"}
                />
                <Box id='main'
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                >
                    <InputGroup
                        display={'flex'} alignItems={'center'}
                        border={'1px'} borderRadius={'10px'} 
                        borderColor={'var(--strong950)'}
                        cursor={'search'}
                        fontSize={14} textColor={'var--(sub600)'}
                        maxW='820px' h='52px'
                        _placeholder={{textColor:'var--(soft400)'}}
                    >
                        <InputLeftElement pointerEvents='none' color={'var(--soft400)'}>
                            <RiSearch2Line className="iconM"/>
                        </InputLeftElement>
                        <Input 
                            w={'100%'} h={'100%'}
                            type='search' 
                            placeholder='Search...'  
                            value={inputValue}
                            onChange={(e:any) => setInputValue(e.target.value)} 
                                        
                        />
                        <InputRightElement pointerEvents="none" color={'var(--soft400)'}>
                            <IoFilter className="iconM"/>
                        </InputRightElement>
                    </InputGroup>

                    <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)', xl:'repeat(4, 1fr)'}} 
                        gap={{base:'24px',lg:'28px'}}
                    >
                        {
                            fetchData.map((item)=>{
                                return(
                                    <PropertiesCard key={item?.id}
                                        picture={item?.images[0]} 
                                        title={item?.title} 
                                        pricing={item?.price} 
                                        duration={null}
                                        details={item?.description}
                                        id={item?.id}
                                    />
                                )
                            })
                        }
                    </Grid>
                    
                </Box>
                <Footer/>
            </Box>
            
        </>
    )
}

export default PropertiesScreen;