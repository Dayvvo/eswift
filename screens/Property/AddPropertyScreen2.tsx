import Btn from "@/components/Btn";
import { Box, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Menu, Select, Text, Textarea } from "@chakra-ui/react"
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


export const AddPropertyScreenTwo =({onClick}:{onClick:()=>void})=> {
    
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

    const [inputValue, setInputValue] = useState({
        "address":"",
        "price":"",
        "period":"",
    })

    const handleInput =(event:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=> {
        setInputValue({...inputValue, [event.target.name]: event.target.value})
    }

    const handleSubmit =(e:ChangeEvent<HTMLFormElement>) => {

        axios.post('', inputValue)
        .then((res)=>{
                
                onClick()
            }
        )
        .catch((err)=> {
                console.log(err)
            }
        )
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
                                name="address"
                                value={inputValue?.address}
                                onChange={handleInput}          
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
                            display={'flex'}
                            alignItems={'center'}
                            border={'1px'} borderRadius={'10px'} 
                            borderColor={'var(--soft200)'}
                            cursor={'text'}
                            fontSize={14} textColor={'var(--sub600)'}
                            w='100%' h='40px'
                            _placeholder={{textColor:'var(--soft400)'}}
                        >
                            <Input 
                                w={'90%'} h={'100%'}
                                borderRight={'1px solid var(--soft400)'}
                                borderRightRadius={'0'}
                                type='text' 
                                placeholder='₦ 0.00'  
                                name="price"
                                value={inputValue?.price} 
                                onChange={handleInput}         
                            />
                            <Select 
                                cursor={'pointer'}
                                border={'0px solid #FFFFFF'}
                                borderLeftRadius={'0px'}
                                _focusWithin={'0px solid #FFFFFF'}
                                fontSize={14} textColor={'var(--sub600)'}
                                w='20%' h='40px'
                                _placeholder={{textColor:'var(--soft400)'}}
                                placeholder='Duration'
                                onChange={handleInput}
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
                <Btn onClick={onClick}
                    my={'20px'}
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