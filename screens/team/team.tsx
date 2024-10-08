
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text, Flex, } from "@chakra-ui/react";
import { Executives } from "./executives";
import { Sales } from "./sales";
import { Footer } from "@/components/footer";
import { Background } from "../home/Background";


const TeamScreen =( )=> {
    function scrollToSection() {
        const section = document.querySelector('#main') as HTMLElement;
        section.scrollIntoView({ behavior: 'smooth' });
    }
    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} header={"The E-Swift Team"}
                    details={"Meet our dedicated team of real estate professionals."} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/AboutVid.mp4"}
                    click={scrollToSection}
                />
                <Background/>
                <Box id="main"
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'24px'}
                    mb={'120px'}
                >
                   <Executives/>
                   <Sales/>
                </Box>
                <Footer/>
            </Box>
        </>
    )
}

export default TeamScreen;