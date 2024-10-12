import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"


export const SectionTwo =()=> {
    return (
        <>
            
            <Flex bg={"transparent"}
                flexDir='column'
                py={"80px"} 
                width={"100%"} gap={{base:'32px', md:'48px'}}
                alignItems={'center'}
                px={{base:'1rem',lg:'2rem'}} textAlign={'center'}
            >
                <Text
                    className="antic"
                    fontSize={{base:'24px', md:'32px',lg:'48px'}}
                    textColor={'#3A3148'}
                    fontWeight={400}
                    maxW={'1240px'}
                >
                    Are you an Affiliate Marketer seeking the opportunity ot earn money from
                    the comfort of your home?
                </Text>                    
                <Text
                    className="roboto"
                    fontSize={{base:'16px', md:'24px',lg:'32px'}}
                    fontWeight={300}
                    textColor={'#827053'}
                    maxW={'1000px'}
                >
                    E-Swift PropertyMart is calling on diligent Affiliate Marketers who would be rewarded with the best commissions
                    on referrals for land or property sales and purchase deals. <br/>
                    Earn up to 2% Commissions on every successful referral.
                </Text>
            </Flex>
        
        </>
    )
}