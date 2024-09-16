import Btn from "@/components/Btn";
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


export const AddPropertyScreenFour =({onClick}:{onClick:()=>void})=> {
    
    const subs:any[] = [
        {
            id:1,
            count:<FaCheck/>,
            title:'Property Title & Category',
            bg:'#1FC16B',
            text:'#FFF'
        },{
            id:2,
            count:<FaCheck/>,
            title:'Location & Pricing',
            bg:'#1FC16B',
            text:'#FFF'
        },
        {
            id:3,
            count:'3',
            title:'Images',
            bg:'#1FC16B',
            text:'#FFF'
        },{
            id:4,
            count:'4',
            title:'Documents',
            bg:'var(--primaryBase)',
            text:'#FFF'
        }

        
    ]

    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.addEventListener('change', (e: any) => {
          const file = e.target.files[0];
          console.log(file);
        });
      }


    return(
        <>
            <Box 
                w={'100%'}
                px={'20px'}
                className="inter"
            >
                <Flex 
                    w={'100%'}
                    justifyContent={'space-between'}
                >
                    {
                        subs.map((sub)=>(
                            <Flex key={sub?.id} my={'24px'}
                                w={'fit-content'}
                                alignItems={'center'} 
                                gap={{base:'12px', md:'16px'}}
                                className="inter"
                            >
                                <Flex
                                    alignItems={'center'}
                                    gap={'8px'}
                                >
                                    <Flex w={'20px'} h={'20px'}
                                        border={'1px solid var(--soft200)'} borderRadius={'100%'}
                                        bg={`${sub?.bg}`} alignItems={'center'} 
                                        justifyContent={'center'} textColor={`${sub?.text}`}
                                        fontSize={'14px'} fontWeight={400}
                                    >
                                        {sub?.count}
                                    </Flex>
                                    <Text
                                        fontWeight={400} textColor={'var(--strong950)'}
                                        fontSize={'14px'}
                                    >
                                        {sub?.title}
                                    </Text>
                                </Flex>
                                <IoIosArrowForward className="arrow"/>
                            </Flex>
                        ))
                    }
                </Flex>
                <Flex
                    flexDir={'column'}
                    gap={'16px'}
                    w="100%"
                    py={'20px'}

                >
                    <Flex
                        bg={'var(--weak50)'}
                        w={'100%'} alignItems={'center'}
                        px={'20px'} py={'6px'} className="robotoF"
                    >
                        <Text
                            fontSize={'12px'} fontWeight={500}
                            textColor={'var(--soft400)'}
                        >
                            FAMILY RECEIPT
                        </Text>
                    </Flex>
                    <Flex
                        w={'100%'}
                        p={'8px'} gap={'20px'}
                    >
                        <Box
                            borderRadius={'100%'}
                            overflow={'hidden'} w={'64px'} h={'64px'}
                        >
                            <Image w={'100%'} h={'100%'} src="" alt="/"/>
                        </Box>
                        <Box 
                            className="inter"
                            fontWeight={500}
                        >
                            <Text 
                                fontSize={'16px'}
                                textColor={'var(--strong950)'}
                            >
                                Upload Documents
                            </Text>
                            <Text 
                                fontSize={'14px'}
                                textColor={'var(--sub600)'}
                                fontWeight={400}
                            >
                                Min 400x400px, PNG or PDF
                            </Text>
                        </Box>
                    </Flex>

                    <Flex
                        bg={'var(--weak50)'}
                        w={'100%'} alignItems={'center'}
                        px={'20px'} py={'6px'} className="robotoF"
                    >
                        <Text
                            fontSize={'12px'} fontWeight={500}
                            textColor={'var(--soft400)'}
                        >
                            SURVEY PLAN
                        </Text>
                    </Flex>
                    <Flex
                        bg={'var(--weak50)'}
                        w={'100%'} alignItems={'center'}
                        px={'20px'} py={'6px'} className="robotoF"
                    >
                        <Text
                            fontSize={'12px'} fontWeight={500}
                            textColor={'var(--soft400)'}
                        >
                            C OF O
                        </Text>
                    </Flex>
                </Flex>
                <Btn onClick={onClick}
                    my={'20px'}
                    border={'1px solid var(--primaryBase)'} display={'flex'} alignItems={'center'}
                    w={"100%"} h={"40px"} bg={"#FFFFFF"}
                    borderRadius={'10px'} textColor={'var(--primaryBase)'}
                >
                    Completed
                </Btn>
            </Box>
        </>
    )
}