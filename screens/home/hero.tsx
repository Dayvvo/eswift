import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Btn from "@/components/Btn";
import { IoPlayOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";


const Hero = () => {

  return (
    <>
      <Box id="hero" width={"100%"} height={"100vh"} pos={'relative'}
        bgImage="url('/BG.png')"
        bgSize="cover"
        bgPosition="center"
        className="robotoF"
        overflow={'clip'}
      >
        <Flex bg={"transparent"}
          flexDir={{base:'column',lg:'row'}}
          py={"140px"} 
          width={"100%"} h={"100%"}
          alignItems={{base:"start", lg:"start"}}
        >
          <Flex 
            px={{ base: "1rem", lg:"6rem" }}
            flexDir={"column"} gap={"16px"} color={"var(--TextCol)"}
            w={{base:"100%", xl:"50%"}} className="robotoF"
          >
            <Text textAlign={{base:'center', lg:'start'}} fontSize={{base:"32px",md:'42px', lg:'38px', xl:"64px"}} fontWeight={400} className="antic">
              We Provide Dream Properties
            </Text>
            <Text textAlign={{base:'center', lg:'start'}} fontSize={{base:"14px", xl:"18px"}} fontWeight={400}>
              Discover your perfect space with our expert guidance and extensive listings.
            </Text>
            <Flex mt={{base:'24px', lg:'34px'}}
              justifyContent={{base:'center',lg:'start'}}
              alignItems={'center'} w={'100%'} gap={'8px'}
            >
              <Text fontSize={{base:"12px",md:"14px",lg:"16px"}} fontWeight={700}>
                SEARCH PROPERTIES NOW
              </Text>
              <Flex w={'80px'} h={'2px'} bg={'var(--TextCol)'}/>
              <Link href={'/'}>
                <Btn
                  display={'flex'} alignItems={'center'} justifyContent={'center'}
                  py="14px" w={'fit-content'} h={'fit-content'}
                  px="14px"
                  borderRadius={'999px'} bg={'transparent'}
                  border={'2px solid var(--TextCol)'} textColor={'var(--TextColor)'} fontSize={'20px'}
                >
                  <IoPlayOutline />
                </Btn>
              </Link>
            </Flex>
            
            
          </Flex>
          <Flex
              w={{base:"100%", xl:"50%"}} className="robotoF"
              bg={'transparent'} alignItems={'end'} justifyContent={'flex-end'}
            >
              <Image width={'100%'} height={'100%'} src="/Hero.png" alt="hero"/> 
          </Flex>
          
        </Flex>

        <Box position={'absolute'} bottom={40} display={'flex'} w={'100%'} justifyContent={'center'} fontSize={'30px'}
         zIndex={50} opacity={0.4}
        >
          <Link href={"#Main"}>
            <Image src="/HeroPulsing.gif" alt="pulsing" w={78} h={78} className="upside"/>
          </Link>
        </Box>
        <Image src="/Underlay.png" alt="" 
          position={'absolute'} zIndex={50} bottom={0}
          w={'100%'} h={'20%'}
        />
      </Box>
    </>
    // <StyledHero>
    //   <Box className="hero-container">
    //     <Box color="var(--minColor)" className="poppins" display={{ lg: "block" }}>
    //       <Box px={{ base: "1.5rem", lg: "initial" }} py="10rem">
    //         <Text
    //           fontWeight={500}
    //           fontSize={{ base: "2.2rem", md: "3rem", lg: "4.2rem" }}
    //         >
    //           Welcome to Casa Central - Your Vision, Our Craftsmanship
    //         </Text>
    //         <Button
    //           bg={"var(--globColor)"}
    //           border={'1px solid var(--secColor)'}
    //           borderRadius={4}
    //           className="poppins"
    //           color="var(--secColor)"
    //           fontWeight={500}
    //           py="25px"
    //           fontSize={".95rem"}
    //           _hover={{ bg: "var(--globColor)", color: "var(--secColor)", border: '1px solid var(--secColor)' }}
    //           mt={{ base: "1.2em", lg: "initial" }}
    //           onClick={() => {
    //             router.push("/portfolio");
    //           }}
    //         >
    //           EXPLORE
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Box>
    // </StyledHero>
  );
};

export default Hero;
