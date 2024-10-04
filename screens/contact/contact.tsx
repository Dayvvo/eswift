
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Text, Flex, } from "@chakra-ui/react";



const ContactScreen =( )=> {

    return (

        <>
            <Box>
                <NavBar/>
                <HeroPropsVideo  
                    bg={"#00000070"} Nav={"#contact"} header={"Contact Us"}
                    details={"Have a question or need assistance? Feel free to reach out to us using the following information:"} 
                    buttonPos={null} w={"100%"} h={"100vh"} video={"/AboutVid.mp4"}
                />
                <Box id="contact"
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                    mb={'120px'}
                >
                   <Text
                        className="antic"
                        fontSize={{base:'24px', md:'32px',lg:'48px'}}
                        textColor={'#3A3148'}
                        fontWeight={400}
                        maxW={'1240px'} textAlign={'center'}
                    >
                       Have a question or need assistance? Our friendly team is here to help. Contact us today for a personalized consultation and let us guide you through your real estate journey.
                    </Text>
                </Box>
                <Box
                    display="flex"
                    flexDirection={{ lg:'row'}}
                    w={'100%'}
                    h={{base:'auto',lg:'440px'}}
                    gap="20px"
                    alignItems='center' mb={20}
                >
                    <Box
                        w={{base:'100%',lg:'50%'}}
                        px={16}
                        display={'flex'} flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        { 
                        ['Phone: +234 8066895363','WhatsApp: +234 8059112878','Email:eswiftpropertymart@gmail.com'].map((item)=>( 
                            <Text key={item}
                                fontSize="30px"
                                fontWeight={600}
                                className="roboto"
                                borderBottom={'2px solid #626871'} 
                                textColor={'var(--TextCol'} py={'6px'}
                            >
                                {item}
                            </Text>
                        ))
                        }
                    </Box>
                    <Box 
                        w={{base:'100%',lg:'50%'}}
                        bgImage="url('/contact.png')"
                        bgSize="cover"
                        bgPosition="center"
                    >
                    </Box>
                </Box>
            </Box>
            
        </>
    )
}

export default ContactScreen;