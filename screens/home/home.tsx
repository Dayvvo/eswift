
import NavBar from "@/components/navBar";
import { Box } from "@chakra-ui/react"
import Hero from "./hero";
import { SectionOne } from "./sectionOne";
import { SectionTwo } from "./sectionTwo";
import { HeroProps } from "@/components/heroProps";
import { SectionThree } from "./sectionThree";


const HomePage =()=> {


    return (
        <>
            <Box>
                <NavBar/>
                <Hero/>
                <SectionOne/>
                <SectionTwo/>
                <Box
                    py={'120px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} gap={'120px'}
                >
                    <HeroProps bgImage={"url('/Find-Dream.jpg')"} bg={"#00000080"} 
                        Nav={""} header={"Find Dream Properties"} 
                        details={"Explore our extensive listings of properties in Lagos and beyond."} 
                        buttonPos={'rotate'} w={'100%'} h={'100vh'}
                    />
                    <HeroProps bgImage={"url('/Become-partner.jpg')"} bg={"#00000080"} 
                        Nav={""} header={"Become Our Partner"} 
                        details={"Join our thriving network of real estate professionals and earn competitive commissions."} 
                        buttonPos={'rotate'} w={'100%'} h={'100vh'}
                    />
                    <SectionThree/>
                </Box>
            </Box>
            
        </>
    )
}

export default HomePage;