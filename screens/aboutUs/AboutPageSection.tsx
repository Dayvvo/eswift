import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"


export const AboutSection =()=> {
    return (
        <>
            <Box id="Main" width={"100%"}
                bg="transparent"
                bgSize="cover"
                bgPosition="center"
                className="robotoF"
                overflow={'clip'}
                mt={8}
            >
                <Flex bg={"transparent"}
                    flexDir='column'
                    py={"60px"} 
                    width={"100%"} gap={{base:'32px', md:'48px'}}
                    alignItems={'center'}
                    px={{base:'1rem',lg:'2rem'}} textAlign={'center'}
                >
                    <Image src={'/Company.gif'} alt="/" 
                        width={116}
                        height={114}
                    />
                    <Text
                        className="antic"
                        fontSize={{base:'24px', md:'32px',lg:'48px'}}
                        textColor={'#3A3148'}
                        fontWeight={400}
                        maxW={'1240px'}
                    >
                        E-Swift PropertyMart is a leading digital real estate company with branches in Akure, 
                        Lagos and Abuja offering a comprehensive range of services to buyers, sellers, landlords, 
                        and tenants through our innovative online platforms.
                    </Text>                    
                    <Text
                        className="roboto"
                        fontSize={{base:'16px', md:'24px',lg:'32px'}}
                        fontWeight={300}
                        textColor={'#827053'}
                        maxW={'1000px'}
                    >
                        At E-Swift PropertyMart, we understand that finding your dream home is more than just a transaction; it`s about finding the perfect space to create memories and build your future. 
                        With our dedicated team of real estate professionals, we are committed to helping you every step of the way.
                    </Text>
                </Flex>
            </Box>
        </>
    )
}