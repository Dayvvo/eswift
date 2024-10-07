
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text, Flex, InputGroup, InputLeftElement, Input, InputRightElement, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { PropertiesCard } from "../properties/propertiesCard";
import { GalleryCard } from "./galleryCard";
import { Footer } from "@/components/footer";
import { LoadMore } from "@/components/LoadMore";
import { Background } from "../home/Background";


const GalleryScreen =( )=> {

    const [inputValue, setInputValue] = useState<string>('')
    const [page, setPage] = useState<number>(0)

    const projects = [

        {
            id:1,
            title:'Oluyole estate',
            date:'',
            details:'Korem ipsum dolor sit celex dor divorless',
            picture:'/properties-dummy.png',
        },
        {
            id:2,
            title:'Oluyole estate',
            date:'',
            details:'Non didikai ka imiss epsipass imala sookrat katostar abore ceriss katicu me ta sentende divoless ka krissas',
            picture:'/properties-dummy.png',
        },
        {
            id:3,
            title:'Oluyole estate',
            date:'',
            details:'Non didikai ka imiss epsipass imala sookrat katostar abore ceriss katicu me ta sentende divoless ka krissas',
            picture:'/properties-dummy.png',
        },
        {
            id:4,
            title:'Oluyole estate',
            date:'',
            details:'Non didikai ka imiss epsipass imala sookrat katostar abore ceriss katicu me ta sentende divoless ka krissas',
            picture:'/properties-dummy.png',
        },
        
    ]

    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} Nav={"/gallery/#main"} header={"Projects"} 
                    details={"Here are some of our notable projects"} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/ProjectVid.mp4"}
                />
                <Background/>
                <Box id="main"
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
                            projects.map((project)=>{
                                return(
                                    <GalleryCard key={project?.id}
                                        date={project?.date}
                                        details={project?.details}
                                        title={project?.title}
                                        picture={project?.picture}
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

export default GalleryScreen;