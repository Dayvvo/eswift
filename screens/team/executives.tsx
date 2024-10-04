import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import Image from "next/image"


export const Executives =()=> {
    
    const Executives = [
        {
            id:1,
            person:'Oronnaye Ayomide',
            title:'Web Designer',
            picture:'/Personel.png'
        },
        {
            id:2,
            person:'Opeyemi Adeyemi',
            title:'CEO',
            picture:'/Personel.png'
        },
        {
            id:3,
            person:'Timmy Bagwells',
            title:'Web Developer',
            picture:'/Personel.png'
        },
        
    ]


    return (
        <>
        <Box
            bg={'#E4ECF0'} w={'100%'} h={''}
            py={'54px'} className="antic" display={'flex'} alignItems={'center'}
            flexDir={'column'}
        >
            <Text
                textAlign={'center'}
                fontWeight={400} fontSize={'48px'}
                textColor={'var(--TextCol)'}
            >
                Executives
            </Text>
            <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)', xl:'repeat(3, 1fr)'}} 
                gap={{base:'24px',lg:'40px'}} mt={'80px'} 
            >
                {
                    Executives.map((item)=> {
                        return(
                            <Box display={'flex'} flexDir={'column'} gap={'12px'} maxW={'310px'} h={'fit-content'}>
                                <Box 
                                    w={'100%'} 
                                    h={'300px'}
                                    borderRadius={'15px'} overflow={'hidden'}
                                >
                                    <Image src={`${item?.picture}`} alt="" width={310} height={300} />
                                </Box>
                                <Text
                                    textAlign={'center'}
                                    fontWeight={300} fontSize={'30px'}
                                    textColor={'#000'}
                                    className="robotoF"
                                >
                                    {item?.person}
                                </Text>
                                <Text
                                    textAlign={'center'}
                                    fontWeight={400} fontSize={'30px'}
                                    textColor={'#000'}
                                >
                                    {item?.title}
                                </Text>

                            </Box>
                        )
                    })
                }
            </Grid>
        </Box>    
        </>

    )
}