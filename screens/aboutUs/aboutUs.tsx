
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text, Flex, } from "@chakra-ui/react";
import { AboutSection } from "./AboutPageSection";
import { Video } from "./video";
import { MoreDetails } from "./MoreDetails";


const AboutUsScreen =( )=> {

    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} Nav={"/aboutUs/#main"} header={"The E-Swift Dream"}
                    details={"Explore our story and how we've become a trusted leader in the industry."} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/AboutVid.mp4"}
                />
                <AboutSection/>
                <Video/>
                <Box id="main"
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                >
                    <Text
                        className="antic"
                        fontSize={{base:'24px', md:'32px',lg:'48px'}}
                        textColor={'#3A3148'}
                        fontWeight={400}
                        maxW={'1240px'}
                    >
                        Why you should be a part of our dream?
                    </Text>
                    <Text
                        className="roboto"
                        fontSize={{base:'16px', md:'24px',lg:'32px'}}
                        fontWeight={300}
                        textColor={'#827053'}
                        maxW={'1000px'}
                    >
                        Your trusted partner in real estate solutions
                    </Text>
                    <MoreDetails/>
                </Box>
            </Box>
            
        </>
    )
}

export default AboutUsScreen;