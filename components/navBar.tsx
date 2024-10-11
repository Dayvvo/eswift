import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Btn from "./Btn";
import { Logo } from "./logo";
import { Background } from "@/screens/home/Background";


const NavBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {

      const handleScroll =()=> {
        if( pathname === '/'){
          setIsScrolled(window.scrollY > 100);
        } else {
          setIsScrolled(window.scrollY >= 0);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);

    },[]);

  
  const NavLink = [
    {
      id:1,
      Navigator:'Properties',
      Link:'/properties'
    },
    {
      id:2,
      Navigator:'Gallery',
      Link:'/gallery'
    },
    {
      id:3,
      Navigator:'About Us',
      Link:'/about'
    },
    {
      id:4,
      Navigator:'Our Team',
      Link:'/team'
    },
    {
      id:5,
      Navigator:'Blog',
      Link:'/blogspot'
    },
    {
      id:6,
      Navigator:'Contact Us',
      Link:'/contact'
    }
  ] 
  
  return (
    <Box 
      position="relative" w="100vw" height="fit-content"
      
    >
      <Box
        as="nav"
        zIndex={100}
        px={{ base: "1rem", lg:"2rem", xl:"4rem" }}
        height={{base:'86px',lg:'96px'}} py={'24px'}
        bg={`${isScrolled ? "#FFFFFF90" : "" }`} 
        backdropFilter={isScrolled ? 'blur(10px)':'blur(1px)'}
        _hover={{
          bgOpacity: "0.1",
          backdropfilter:"blur(5px)",
        }}
        color="var(--TextCol)"
        w="100%" h={'72px'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        position="fixed"
        top={0}
        right={0}
        left={0}
      >
        <Logo
          width={120} 
          height={40}
        />
        <Box
          display={{ base: "none", lg: "flex" }}
          gap={{md:'18px', xl:'32px'}}
          alignItems="center"
          justifyContent={"space-between"}
          className="robotoF"
          fontWeight={500}
        >
          { 
            NavLink.map((Links) => (
              <Box key={Links?.id}>
                <Link href={`${Links?.Link}`}>
                  <Text
                    fontWeight="500"
                    color="var(--TextCol)"
                    _active={{ fontWeight: "800" }}
                    fontSize={`${pathname === `${Links?.Link}` ? "16px" : "14px"}`}
                    _hover={{fontSize:'16px'}}
                    transition='font-size'
                    transitionDuration='500'
                    transitionTimingFunction={'ease-in-out'}
                    // border={"1px solid var(--TextCol)"}
                  >
                    {Links?.Navigator}
                  </Text>
                </Link>
              </Box>
            ))          
          }     

          <Box
            display={'flex'} gap={{lg:'14px',xl:'24px'}}
            w={'fit-content'} h={'fit-content'}
          >
            <Link href={'/login'}>
              <Btn
                display={'flex'} alignItems={'center'} justifyContent={'center'}
                bg={'#3170A6'} borderRadius={'99px'} w={'160px'} h={'48px'}
                textColor={'#FFF'} fontWeight={500} className="roboto"
                fontSize={'16px'}
              >
                Sign In
              </Btn>
            </Link>
            <Link href={'/signup'}>
              <Btn
                display={'flex'} alignItems={'center'} justifyContent={'center'}
                bg={'#3170A6'} borderRadius={'99px'} w={'160px'} h={'48px'}
                textColor={'#FFF'} fontWeight={500} className="roboto"
                fontSize={'16px'}
              >
                Join Us
              </Btn>
            </Link>
          </Box>
        </Box>

        <Box
          display={{ base: "block", lg: "none" }}
          cursor={"pointer"}
          ref={btnRef}
          onClick={onOpen}
          textColor={'#3170A6'}
        >
          <GiHamburgerMenu size={"25px"} />
        </Box>

        <Drawer
          isOpen={isOpen}
          placement="top"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            bg={"#FFF"}
            height={"100vh"}
            width={"100vw"}
            gap={20}
            py={"10em"}
          >
            <Background/>
            <DrawerCloseButton
              color={"#3170A6"}
              fontSize={"20px"}
              mt={"20px"}
              outline={"none"}
            />

            <DrawerBody>
              <Box
                display={"flex"}
                flexDir={"column"}
                w={'100%'} alignItems={'center'}
                gap={"30px"}
                py={"16px"}
                className="robotoF"
                color="#3170A6"
              > 
                {NavLink.map((Links)=>(
                    <Box key={Links?.id}
                      onClick={onClose}
                      fontSize={"14px"}
                      fontWeight={500}
                      borderBottom={"1px solid var(--Greenlight)"}
                      _hover={{fontSize:'16px'}}
                      px={"16px"}
                    >
                      <Link href={`${Links?.Link}`}>{Links?.Navigator}</Link>
                    </Box>
                  ))
                }
              </Box>

              <Box mt={'20px'}
                display={'flex'} flexDir={'column'} gap={2}
                w={'fit-content'} h={'fit-content'} width={'100%'} alignItems={'center'}
              >
                <Link href={'/login'}>
                  <Btn
                    display={'flex'} alignItems={'center'} justifyContent={'center'}
                    bg={'#3170A6'} borderRadius={'99px'} w={'200px'} h={'42px'}
                    textColor={'#FFF'} fontWeight={500} className="roboto"
                    fontSize={'14px'}
                  >
                    Sign In
                  </Btn>
                </Link>
                <Link href={'/signup'}>
                  <Btn
                    display={'flex'} alignItems={'center'} justifyContent={'center'}
                    bg={'#3170A6'} borderRadius={'99px'} w={'200px'} h={'42px'}
                    textColor={'#FFF'} fontWeight={500} className="roboto"
                    fontSize={'14px'}
                  >
                    Join Us
                  </Btn>
                </Link>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
