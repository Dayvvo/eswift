import Btn from "@/components/Btn";
import { Box, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Menu, Select, Text, Textarea } from "@chakra-ui/react"
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";


export const AddPropertyScreenThree =({onClick}:{onClick:()=>void})=> {
    
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
            bg:'var(--primaryBase)',
            text:'#FFF'
        },{
            id:4,
            count:'4',
            title:'Documents',
            bg:'#FFF',
            text:'var(--sub600)'
        }

        
    ]

    const [dragging, setDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleDragEnter = (e:any) => {
        e.preventDefault();
        setDragging(true);
    };
    
    const handleDragLeave = (e:any) => {
    e.preventDefault();
    setDragging(false);
    };

    const handleDrop = (e:any) => {
    e.preventDefault();
    setDragging(false);
    setUploadedFile(e.dataTransfer.files[0]);
    };

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
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    flexDir={'column'}
                    w="100%" gap={'20px'} 
                    py={'32px'} border={'1px dashed var(--soft200)'}
                    borderRadius={'12px'} bg={'var(--weak50)'} 
                    justifyContent={'center'} alignItems={'center'}
                >
                    <RiUploadCloud2Line className="arrow"/>
                    <Box>
                        <Text fontSize={'14px'}
                            fontWeight={500} textColor={'var(--strong950)'}
                        >
                            { uploadedFile ? `Uploaded file:` : `Choose a file or drag & drop it here.` }
                        </Text>
                        <Text fontSize={'14px'}
                            fontWeight={400} textColor={'var(--sub600)'}
                        >
                            Upload high-quality images of the property.
                        </Text>
                    </Box>
                    <Btn onClick={handleUpload}
                        border={'1px solid var(--soft200)'} display={'flex'} alignItems={'center'}
                        w={"100px"} h={"32px"} bg={"#FFFFFF"} fontSize={'14px'} fontWeight={500}
                        borderRadius={'10px'} textColor={'var(--sub600)'}
                    >
                        Browse File
                    </Btn>
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