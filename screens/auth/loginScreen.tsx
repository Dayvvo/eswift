import { Box, Checkbox, Flex , FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { AuthHeaderProps } from "./authheader"
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import React, { useEffect } from "react";
import Btn from "@/components/Btn";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";


export const LoginScreen =()=> {

    const [show, setShow] = React.useState(false)
    const [inputValue, setInputValue] = useState();
    const [islogin, setIsLogin ] = useState({
        email:'',
        password:'',
    })

    const handleInput =(event:any)=> {
        setIsLogin({...islogin, [event.target.name]: event.target.event})
    }

    const handleSubmit =(event:any) => {
        event.preventDefault(); 
        axios.post('https://api/auth/login')
            .then(
                (res:any)=> {
                    console.log(res)
                }
            )
            .catch(
                (err:any) => {
                    console.log(err)
                }
            )

    }
    

    return(
        <Box display={'flex'} flexDir={'column'} 
            bg={'#FFF'}
            justifyContent={'space-between'}
            w={'100%'} h={'100vh'} 
            px={{base:'16px', lg:'44px'}}
            py={'24px'} 
            className="robotoF"
        >
            <Box 
                h={'fit-content'}
            >
                <Image 
                    width={200}
                    height={100}
                    src={'/logo.svg'}
                    alt={'eswift'}
                />
            </Box>
            <Flex
                flexBasis={1}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box
                    w={{base:'100%', sm:'440px'}}
                    h={'fit-content'}
                    p={{base:'16px', md:'32px'}}
                    border={'1px solid var(--soft200)'}
                    boxShadow={'lg'} borderRadius={'20px'}
                >
                    <AuthHeaderProps
                        icon="/LoginIcon.png"
                        title="Login to your account"
                        description="Enter your details to login."
                    />
                    <Box w={'100%'} border={'1px solid var(--soft200)'} my={'24px'}/>
                    <Flex 
                        flexDir={'column'}
                        w={'100%'} gap={'12px'}
                    >
                        <FormControl w={'100%'}>
                            <FormLabel
                                fontWeight={500} fontSize={'14px'}
                                textColor={'var(--strong950)'}
                            >
                                Email address
                            </FormLabel>
                                <InputGroup
                                    border={'1px'} borderRadius={'10px'} 
                                    borderColor={'var(--soft200)'}
                                    cursor={'text'}
                                    fontSize={14} textColor={'var--(sub600)'}
                                    w='100%' h='40px'
                                    _placeholder={{textColor:'var--(soft400)'}}
                                >
                                    <InputLeftElement pointerEvents='none' color={'var(--soft400)'}>
                                        <MdOutlineEmail className="formicon"/>
                                    </InputLeftElement>
                                    <Input 
                                    w={'100%'} h={'100%'}
                                        type='email' 
                                        placeholder='hello@gmail.com'  
                                        name="email"
                                        value={inputValue}
                                        onChange={handleInput}          
                                    />
                                </InputGroup>
                            <FormHelperText>Email is required</FormHelperText>
                        </FormControl>
                        <FormControl w={'100%'}>
                            <FormLabel
                                fontWeight={500} fontSize={'14px'}
                                textColor={'var(--strong950)'}
                            >
                                Password
                            </FormLabel>
                                <InputGroup
                                    border={'1px'} borderRadius={'10px'} 
                                    borderColor={'var(--soft200)'}
                                    cursor={'text'}
                                    fontSize={14} textColor={'var--(sub600)'}
                                    w='100%' h='40px'
                                    _placeholder={{textColor:'var--(soft400)'}}
                                >
                                    <InputLeftElement pointerEvents='none' color={'var(--soft400)'}>
                                        <RiLockPasswordLine className="formicon"/>
                                    </InputLeftElement>
                                    <Input 
                                        w={'100%'} h={'100%'} outline={'none'}
                                        type={show ? 'text' : 'Password'} 
                                        placeholder='*********'
                                        name="password"
                                        value={inputValue}  
                                        onChange={handleInput}          
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Box onClick={() => setShow(!show)}>
                                            {!show ? <BsEyeSlash className="formicon"/> : <BsEye className="formicon" />}
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>
                            <FormHelperText>Minimum of 8characters</FormHelperText>
                        </FormControl>
                    </Flex>
                    <Flex 
                        w="100%" my={'24px'}
                        justifyContent={'space-between'} 
                    >
                       
                        <Checkbox
                            fontWeight={400} fontSize={'14px'}
                            textColor={'var(--strong950)'}
                        >
                            Keep me logged in
                        </Checkbox>
                        <Link href={'/reset'}>
                            <Text 
                                fontWeight={500} fontSize={'14px'}
                                textColor={'var(--sub600)'} textDecor={'underline'}
                            >
                                Forgot password?
                            </Text>
                        </Link>
                    </Flex>
                    <Link href={'/'}>
                        <Btn onClick={handleSubmit}
                            bg={'var(--primaryBase)'} display={'flex'} alignItems={'center'}
                            w={"100%"} h={"40px"} border={"1px"} borderColor={"#FFFFFF"}
                            borderRadius={'10px'} textColor={'#FFFFFF'}
                        >
                            Login
                        </Btn>
                    </Link>
                </Box>
            </Flex>
            <Text
                fontSize={'14px'}
                fontWeight={400}
                textColor={'var(--sub600)'}
            >
                © {new Date().getFullYear()} E-Swift Property Mart
            </Text> 
        </Box>
    )
} 

