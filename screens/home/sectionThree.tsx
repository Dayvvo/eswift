import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import { SectionThreeProps } from "./sectionThreeProps"


export const SectionThree =()=> {
    const data = [
        {
            id:1,
            point: 'Swift & Efficient Sales Process: At e-Swift, our mission is to provide fast solutions for property sellers seeking a swift and efficient sales process. We understand the urgency associated with selling properties and we are committed to delivering prompt and reliable services.',
        },
        {
            id:2,
            point: 'Residential Sales: From cozy apartments to spacious family homes, we have a wide range of residential properties to suit every lifestyle and budget. (see our website)',
        },
        {
            id:3,
            point: 'Commercial Properties: Whether you`re looking for office space, retail locations, or investment opportunities, we have the expertise to help you find the right commercial property. (see our website)',
        }
    ] 

    const specification:any[] = [
        {
            id:1,
            point:'Property Management: Let us handle the hassle. We offer expert property management, including tenant screening, rent collection, and maintenance.',
        },
        {
            id:2,
            point: 'Contemporary Construction: Build for the future. Our focus on modern design ensures your property remains stylish and valuable',
        },
        ,
        {
            id:3,
            point: 'Property Services: Buy, sell, rent, or lease with ease. Our team provides expert guidance and support throughout the process.',
        },
        {
            id:4,
            point: 'Accurate Valuations: Get expert valuations for your property from our experienced team.',
        },
    ] 


    return (
        <>
            <Flex bg={"#FFFFFF"}
                flexDir='column'
                width={"100%"}
                gap={'50px'}
            >
                <SectionThreeProps mobile={"column"} web={"row"} view={"/Left.png"} gap={'40px'} w={"40%"} h={""} wid={"60%"}  hei={"fit-content"} listData={data} />
                <SectionThreeProps mobile={"column"} web={"row-reverse"} view={"/Right.png"} gap={'40px'} w={"40%"} h={""} wid={"60%"}  hei={"fit-content"} listData={specification} />
            </Flex>
        
        </>
    )
}