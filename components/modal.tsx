import { Box, Flex, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
    children?:ReactNode;
    onClick?:()=> void;

}
export const Modal:React.FC<ModalProps> =({
    onClick, children
})=> {
    return (
        <>
            <Box id="close"
                onClick={onClick}
                w={'100vw'} h={'100vh'}
                zIndex={100} bg={'#00000015'}
            >
                <Flex 
                    w={'100vw'} h={'100vh'}
                    backdropFilter={'blur(10px)'}
                    justifyContent={'center'} alignItems={'center'}
                >
                    <Flex
                        bg={'#FFF'}
                        maxW={'768px'} h={'fit-content'}
                        borderRadius={'15px'} px={{base:'16px', md:'40px'}}
                        py={{base:'12px',md:'20px'}}
                    >
                        <Flex 
                            w={'100%'} h={'fit-content'} 
                            gap={'12px'} justifyContent={'space-between'}
                            p={'20px'} className="robotoF" textColor={'var(--strong950)'}
                        >
                            <Text 
                                fontSize={'18px'} fontWeight={500}
                            >
                                Add Property
                            </Text>
                            <Box onClick={onClick}>
                                <RxCross2 />
                            </Box>
                        </Flex>
                        {children}
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}