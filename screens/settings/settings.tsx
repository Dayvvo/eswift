import Btn from "@/components/Btn"
import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io";

export const SettingsScreen = () => {
    const settings:any[] = [
        {
            id:1, 
            type:'Full Name',
            description:'Your name will be visible to your contacts.',
            info:'Arthur Taylor',
        },{
            id:1, 
            type:'Email Address',
            description:'Business email address recommended.',
            info:'arthur@alignui.com',
        },{
            id:1, 
            type:'Phone Number',
            description:'Business phone number recommended.',
            info:'+1 (012) 345-6789',
        },{
            id:1, 
            type:'Legal Address',
            description:'Legal residential address for billing details',
            info:'12 Rue Principale Ville de Quebec, Quebec, Canada',
        }
    ]
    return (
        <>
            <Box 
                w={'100%'}
                
            >
                <Flex 
                    flexDir={'column'}
                    w={'100%'}
                    className="inter"
                >
                    <Flex 
                        w={'100%'}
                        alignItems={'center'}
                        pt={'24px'} pb={'20px'}
                        border={'1px solid var(--soft200)'}
                    >
                        <Flex 
                            w={{base:'100%',lg:'50%'}}
                            justifyContent={'space-between'}
                            gap={'24px'}
                        >
                            <Box>
                                <Text 
                                    fontWeight={500} fontSize={'14px'} textColor={'var(--strong950)'}
                                    mb={'6px'}
                                >
                                    Profile Photo
                                </Text>
                                <Text 
                                    fontWeight={400} fontSize={'12px'} textColor={'var(--sub600)'}
                                >
                                    Min 400x400px, PNG or JPEG Formats.
                                </Text>
                            </Box>
                            <Flex alignItems={'center'}
                                gap={'20px'} h={'fit-content'} 
                            >
                                <Box w={'fit-content'} h={'fit-content'} borderRadius={'999px'} overflow={'hidden'}>
                                    <Image width={56} height={56}
                                        src={'/avatar1.png'} alt="/"
                                    />
                                    <Btn bg={'transparent'}
                                        display={'flex'} alignItems={'center'} justifyContent={'center'}
                                        w={'68px'} h={'32px'} 
                                        borderRadius={'8px'} textColor={'var(--sub600)'} fontWeight={500}
                                        fontSize={'14px'}
                                    >
                                        Upload
                                    </Btn>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                    {
                        settings.map((setting)=>(
                            <Flex key={setting?.id}
                                w={'100%'}
                                alignItems={'center'}
                                py={'20px'}
                                border={'1px solid var(--soft200)'}
                            >
                                <Flex 
                                    w={{base:'100%',lg:'50%'}}
                                    justifyContent={'space-between'}
                                    gap={'24px'}
                                >
                                    <Box>
                                        <Text 
                                            fontWeight={500} fontSize={'14px'} textColor={'var(--strong950)'}
                                            mb={'6px'}
                                        >
                                            {setting?.type}
                                        </Text>
                                        <Text 
                                            fontWeight={400} fontSize={'12px'} textColor={'var(--sub600)'}
                                        >
                                            {setting?.description}
                                        </Text>
                                    </Box>
                                    <Flex dir="column" gap={'12px'}>
                                        <Text 
                                            fontWeight={500} fontSize={'14px'} textColor={'var(--strong950)'}
                                            maxW={'180px'}
                                        >
                                            {setting?.type}
                                        </Text>
                                        <Text display={'flex'} alignItems={'center'}
                                            fontWeight={500} fontSize={'14px'} textColor={'var(--primaryBase)'}
                                        >
                                            Edit  <IoIosArrowForward />
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        ))
                    }
                    <Flex 
                        w={'100%'}
                        alignItems={'center'}
                        py={'20px'}
                    >
                        <Flex 
                            w={'100%'}
                            justifyContent={'space-between'}
                            gap={'24px'}
                        >
                            <Box>
                                <Text 
                                    fontWeight={500} fontSize={'14px'} textColor={'var(--strong950)'}
                                    mb={'6px'}
                                >
                                    Change Password
                                </Text>
                                <Text 
                                    fontWeight={400} fontSize={'12px'} textColor={'var(--sub600)'}
                                >
                                    Update password for enhanced account security.
                                </Text>
                            </Box>
                            <Btn bg={'transparent'}
                                display={'flex'} alignItems={'center'} justifyContent={'center'}
                                w={'148px'} h={'40px'} 
                                borderRadius={'8px'} textColor={'var(--sub600)'} fontWeight={500}
                                fontSize={'14px'}
                            >
                                Change Password
                            </Btn>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
 
