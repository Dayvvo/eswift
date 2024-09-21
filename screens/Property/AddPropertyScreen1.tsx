import Btn from "@/components/Btn";
import { Box, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Menu, Select, Text, Textarea } from "@chakra-ui/react"
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";


export const AddPropertyScreenOne =({onClick}:{onClick:()=>void})=> {
    
    const subs:any[] = [
        {
            id:1,
            title:'Property Title & Category',
            bg:'var(--primaryBase)',
            text:'#FFF'
        },{
            id:2,
            title:'Location & Pricing',
            bg:'#FFF',
            text:'var(--sub600)'
        },
        {
            id:3,
            title:'Images',
            bg:'#FFF',
            text:'var(--sub600)'
        },{
            id:4,
            title:'Documents',
            bg:'#FFF',
            text:'var(--sub600)'
        }

        
    ]

    const [inputValue, setInputValue] = useState({
        "title":"",
        "category":"",
        "description":"",
    })

    const handleInput =(event:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=> {
        setInputValue({...inputValue, [event.target.name]: event.target.value})
    }

    const handleSubmit =(e:ChangeEvent<HTMLFormElement>) => {

        axios.post('',inputValue)
        .then((res)=>{
                
                onClick()
            }
        )
        .catch((err)=> {

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
                                        {sub?.id}
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
                            Property Title
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
                                placeholder='A descriptive name for the property'  
                                name="title"
                                value={inputValue?.title}
                                onChange={handleInput}          
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl w={'100%'}>
                        <FormLabel
                            fontWeight={500} fontSize={'14px'}
                            textColor={'var(--strong950)'}
                        >
                            Property Category
                        </FormLabel>
                        <Select 
                            w='100%' h='40px' border={'1px solid var(--soft200)'} borderRadius={'10px'} 
                            fontSize={14} textColor={'var--(sub600)'} _placeholder={{textColor:'var--(soft400)'}}
                            placeholder='Category of the property'
                            value={inputValue?.category}
                            onChange={handleInput}
                        >
                            {
                                ['Option 1','Option 2','Option 3','Option 4'].map((entry) => (
                                    <option 
                                        value={`${entry}`}
                                    >
                                        {entry}
                                    </option>
                                ))
                            }
                            
                        </Select>
                    </FormControl>
                    <FormControl w={'100%'}>
                        <FormLabel
                            fontWeight={500} fontSize={'14px'}
                            textColor={'var(--strong950)'}
                        >
                            Description
                        </FormLabel>
                        <Textarea
                            border={'1px solid var(--soft200)'} borderRadius={'10px'} cursor={'text'}
                            fontSize={14} textColor={'var--(sub600)'} _placeholder={{textColor:'var--(soft400)'}}  
                            value={inputValue?.description} 
                            onChange={handleInput}     
                        />
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