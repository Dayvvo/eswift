import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Grid } from "@chakra-ui/react";
import { BlogCard } from "./blogsCard";
import { Footer } from "@/components/footer";

const BlogspotScreen =()=> {
    function scrollToSection() {
        const section = document.querySelector('#main') as HTMLElement;
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    const Blogs = [
        {
            id:1,
            picture:'/blogdumy.png',
            details:'Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.',
            title:'Lorem ipsum dolor sit amet consectetur. Euismod ultrices.',
            date: '10/02/2020'
        },
        {
            id:2,
            picture:'/blogdumy.png',
            details:'Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.',
            title:'Lorem ipsum dolor sit amet consectetur. Euismod ultrices.',
            date: '10/02/2020' 
        },
        {
            id:3,
            picture:'/blogdumy.png',
            details:'Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.',
            title:'Lorem ipsum dolor sit amet consectetur. Euismod ultrices.',
            date: '10/02/2020' 
        },
        {
            id:4,
            picture:'/blogdumy.png',
            details:'Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.',
            title:'Lorem ipsum dolor sit amet consectetur. Euismod ultrices.',
            date: '10/02/2020' 
        },
        {
            id:5,
            picture:'/blogdumy.png',
            details:'Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.',
            title:'Lorem ipsum dolor sit amet consectetur. Euismod ultrices.',
            date: '10/02/2020' 
        },
        {
            id:6,
            picture:'/blogdumy.png',
            details:'Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.',
            title:'Lorem ipsum dolor sit amet consectetur. Euismod ultrices.',
            date: '10/02/2020' 
        },
    ]

    
    return(
        <Box>
            <NavBar/>
            <HeroPropsVideo  
                bg={"#00000070"} header={"Blog"}
                details={"Your Source for Real Estate Insights and Tips"} 
                buttonPos={null} w={"100%"} h={"100vh"} video={"/PropertiesVid.mp4"}
                click={scrollToSection}
            />
            <Box id="blogs"
                    py={'70px'}
                    px={{base:'1rem',lg:'4rem'}}
                    display={'flex'} flexDir={'column'} 
                    alignItems={'center'} gap={'20px'}
                    mb={'120px'}
                >
                     <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)'}} 
                        gap={{base:'24px',lg:'60px'}}
                    >
                        {
                            Blogs.map((item)=>{
                                return(
                                    <BlogCard key={item?.id}
                                        picture={item?.picture} 
                                        title={item?.title} 
                                        details={item?.details}
                                        date={item?.date}
                                    />
                                )
                            })
                        }
                    </Grid>
                </Box>
            <Footer/>
        </Box>
    )
}

export default BlogspotScreen;