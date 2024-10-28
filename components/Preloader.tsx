import { Image, Text, Modal, ModalOverlay, ModalContent, Center, Flex, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const Preloader = () => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false)
        }, 2500)
        return () => clearTimeout(timer)
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent bg="transparent" boxShadow="none" maxW={'1078px'} h={{base:'100vh',lg:'700px'}}>
                <Flex alignItems={'center'} justifyContent={'center'} w={'100%'} h={'100%'}>
                    <Box w={'100%'}
                        h='100%'
                        borderRadius={'8px'}
                        bgImage="url('/Loader.png')"
                        bgSize="cover"
                        bgPosition="center"
                        className="robotoF"
                        overflow={'hidden'}
                    >
                        <Box w={'100%'}
                            h={'100%'}
                            position={'relative'}
                            bgImage="url('/Tall.png')"
                            bgSize="cover"
                            bgPosition="center"
                            px={{base:'24px',md:'44px'}}
                            py={'30px'}
                        >
                            <Flex flexDir={{base:'column',lg:'row'}} w={'100%'} px={{base:'',lg:'60px'}}
                                pos={'absolute'} zIndex={20} justifyContent={'space-between'} mt={10}
                            >
                                <Image src="/Butterfly1.png" alt="/" width={200} height={200}/>
                                <Flex mt={'60'} w={{base:'100%',lg:'fit-content'}} justifyContent={'end'}>
                                    <Image src="/Butterfly2.png" alt="/" width={118} height={114}/>
                                </Flex>
                            </Flex>
                            <Flex w={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>    
                                <Image src={"/Company.gif"} alt="/" width={116} height={114} />
                            </Flex>
                            <Text fontSize={"14px"} fontWeight={400} textColor={"var(--sub600)"}>
                                © {new Date().getFullYear()} e-Swift Property Mart
                            </Text>
                        </Box>
                    </Box>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default Preloader;