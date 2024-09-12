import Btn from "@/components/Btn";
import { Box, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Menu, Select, Text, Textarea } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


export const AddPropertyScreenTwo =()=> {
    
    const subs:any[] = [
        {
            id:1,
            count:<FaCheck/>,
            title:'Property Title & Category',
            bg:'#1FC16B',
            text:'#FFF'
        },{
            id:2,
            count:'2',
            title:'Location & Pricing',
            bg:'var(--primaryBase)',
            text:'#FFF'
        },
        {
            id:3,
            count:'3',
            title:'Images',
            bg:'#FFF',
            text:'var(--sub600)'
        },{
            id:4,
            count:'4',
            title:'Documents',
            bg:'#FFF',
            text:'var(--sub600)'
        }

        
    ]

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
                    <FormControl w={'100%'}>
                        <FormLabel
                            fontWeight={500} fontSize={'14px'}
                            textColor={'var(--strong950)'}
                        >
                            Address
                        </FormLabel>
                        <InputGroup
                            border={'1px'} borderRadius={'10px'} 
                            borderColor={'var(--soft200)'}
                            cursor={'text'}
                            fontSize={14} textColor={'var--(sub600)'}
                            w='100%' h='40px'
                            _placeholder={{textColor:'var--(soft400)'}}
                        >
                            <Input 
                            w={'100%'} h={'100%'}
                                type='text' 
                                placeholder='The location of the property'  
                                name=""
                                value={''}          
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl w={'100%'}>
                        <FormLabel
                            fontWeight={500} fontSize={'14px'}
                            textColor={'var(--strong950)'}
                        >
                            Price<Text as="span" textColor={'var(--primaryBase)'}>*</Text>
                        </FormLabel>
                        <InputGroup
                            border={'1px'} borderRadius={'10px'} 
                            borderColor={'var(--soft200)'}
                            cursor={'text'}
                            fontSize={14} textColor={'var--(sub600)'}
                            w='100%' h='40px'
                            _placeholder={{textColor:'var--(soft400)'}}
                        >
                            <Input 
                                w={'70%'} h={'100%'}
                                type='text' 
                                placeholder='₦ 0.00'  
                                name=""
                                value={''}          
                            />
                            <Select 
                                border={'1px'} borderRightRadius={'10px'} 
                                borderColor={'var(--soft200)'}
                                cursor={'text'}
                                fontSize={14} textColor={'var--(sub600)'}
                                w='30%' h='100%'
                                _placeholder={{textColor:'var--(soft400)'}}
                                placeholder='Annually'
                            >
                                {
                                    ['Annually','Weekly','Monthly','Quarterly'].map((entry) => (
                                        <option  
                                            value={`${entry}`}
                                        >
                                            {entry}
                                        </option>
                                    ))
                                }
                                
                            </Select>
                        </InputGroup>
                    </FormControl>
                </Flex>
                <Btn my={'20px'}
                    border={'1px solid var(--primaryBase)'} display={'flex'} alignItems={'center'}
                    w={"100%"} h={"40px"} bg={"#FFFFFF"}
                    borderRadius={'10px'} textColor={'var(--primaryBase)'}
                >
                    Next
                </Btn>
            </Box>
        </>
    )
}