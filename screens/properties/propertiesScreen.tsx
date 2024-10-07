
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
                        fontSize={14} textColor={'var--(sub600)'}
                        maxW='1020px' h={{base:'52px',lg:'80px'}}
                        _placeholder={{textColor:'#666666'}}
                        className="urbanist" overflow={'hidden'}
                    >
                        <Input 
                            w={'80%'} h={'100%'}
                            border={'none'} _focusVisible={'none'}
                            type='search' 
                            placeholder='Search for a Property'  
                            value={inputValue}
                            onChange={(e:any) => setInputValue(e.target.value)} 
                                        
                        />
                        <InputRightElement pointerEvents="none" w={'fit-content'} h={'max-content'} mt={4} mx={3} zIndex={30}>
                            <Btn type={'submit'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                W={'148px'}
                                h="48px"
                                bg={'#3170A6'}
                                borderRadius={'8px'}
                                textColor={'white'}
                                gap={'8px'}
                                _hover={{opacity:0.5}}
                            >
                                <RiSearch2Line/> Find Property
                            </Btn>
                        </InputRightElement>
                    </InputGroup>

                    <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', xl:'repeat(4, 1fr)'}} 
                        gap={'20px'}
                    >
                        {
                            fetchData.map((item)=>{
                                return(
                                    <PropertiesCard key={item?.id}
                                        picture={item?.images[0]} 
                                        title={item?.title} 
                                        pricing={item?.price} 
                                        details={item?.description}
                                        id={item?.id}
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