
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text, Flex, } from "@chakra-ui/react";
import { Executives } from "./executives";
import { Sales } from "./sales";


const TeamScreen =( )=> {

    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} Nav={"/aboutUs/#main"} header={"The E-Swift Team"}
                    details={"Meet our dedicated team of real estate professionals."} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/AboutVid.mp4"}
                />
                <Box id="main"
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                    mb={'120px'}
                >
                   <Executives/>
                   <Sales/>
                </Box>
            </Box>
            
        </>
    )
}

export default TeamScreen;