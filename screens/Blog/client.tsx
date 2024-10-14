import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import { Box, Grid } from "@chakra-ui/react";
import { BlogCard } from "./blogsCard";
import { useEffect, useState } from "react";
import useBlog from "@/hooks/useBlog";

interface BlogPostProps {
  _id: any;
  title: string;
  header_image: string;
  introduction: string;
  body: string;
  body_image: string;
  createdAt: any;
}

const BlogspotScreen = () => {
  const [blogPost, setBlogPost] = useState<BlogPostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { getBlog } = useBlog();
//   const Blogs = [
//     {
//       id: 1,
//       picture: "/blogdumy.png",
//       details:
//         "Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.",
//       title: "Lorem ipsum dolor sit amet consectetur. Euismod ultrices.",
//       date: "10/02/2020",
//     },
//     {
//       id: 2,
//       picture: "/blogdumy.png",
//       details:
//         "Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.",
//       title: "Lorem ipsum dolor sit amet consectetur. Euismod ultrices.",
//       date: "10/02/2020",
//     },
//     {
//       id: 3,
//       picture: "/blogdumy.png",
//       details:
//         "Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.",
//       title: "Lorem ipsum dolor sit amet consectetur. Euismod ultrices.",
//       date: "10/02/2020",
//     },
//     {
//       id: 4,
//       picture: "/blogdumy.png",
//       details:
//         "Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.",
//       title: "Lorem ipsum dolor sit amet consectetur. Euismod ultrices.",
//       date: "10/02/2020",
//     },
//     {
//       id: 5,
//       picture: "/blogdumy.png",
//       details:
//         "Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.",
//       title: "Lorem ipsum dolor sit amet consectetur. Euismod ultrices.",
//       date: "10/02/2020",
//     },
//     {
//       id: 6,
//       picture: "/blogdumy.png",
//       details:
//         "Lorem ipsum dolor sit amet consectetur. Urna nisl in ullamcorper ac pulvinar ipsum vestibulum in. Sagittis lorem turpis nunc elementum gravida interdum nec. Suspendisse faucibus eu non et.",
//       title: "Lorem ipsum dolor sit amet consectetur. Euismod ultrices.",
//       date: "10/02/2020",
//     },
//   ];

  function scrollToSection() {
    const section = document.querySelector("#main") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const getBlogFn = async () => {
      setLoading(true);
      try {
        const req = await getBlog();
        setBlogPost(req.data.data);
        console.log(req.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }

      // console.log("req", req?.data);
    };

    getBlogFn();
  }, []);
  return (
    <Box>
      <NavBar />
      <HeroPropsVideo
        bg={"#00000070"}
        click={scrollToSection}
        header={"Blog"}
        details={"Your Source for Real Estate Insights and Tips"}
        buttonPos={null}
        w={"100%"}
        h={"100vh"}
        video={"/PropertiesVid.mp4"}
      />
      <Box
        id="blogs"
        py={"70px"}
        px={{ base: "1rem", lg: "4rem" }}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={"20px"}
        mb={"120px"}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={{ base: "24px", lg: "60px" }}
        >
          {blogPost.map((item) => {
            return (
              <BlogCard
                key={item?._id}
                picture={item?.header_image}
                title={item?.title}
                details={item?.introduction}
                date={item?.createdAt}
              />
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default BlogspotScreen;
