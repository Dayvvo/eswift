import Btn from "@/components/Btn";
import { BackIcon } from "@/components/svg";
import Wrapper from "@/components/Wrapper";
import useBlog from "@/hooks/useBlog";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PreviewBlog = () => {
  const router = useRouter();

  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState(null) as any;
  

  console.log('previewData', previewData);

  const {addBlog} = useBlog();

  useEffect(() => {
    // const parsedImage = localStorage.getItem("headerImage");
    const storedImage = localStorage.getItem("headerImage")?.toString() || null;

    if (storedImage) {
      setHeaderImage(storedImage);
    }
  }, []);

  useEffect(() => {
    const unParsedPreviewData = localStorage.getItem('previewData');
    if (unParsedPreviewData) {
      const parsedPreviewData = JSON.parse(unParsedPreviewData);
      setPreviewData(parsedPreviewData);
    }
  }, [])

  useEffect(() => {
    const storedImage = localStorage.getItem("bodyImage");
    if (storedImage) {
      setBodyImage(storedImage);
    }
  }, []);

  const articleTitle = previewData ? previewData.articleTitle : "";
  const introValue = previewData ? previewData.introValue : "";
  const bodyValue = previewData ? previewData.bodyValue : "";
  const conclusionValue = previewData ? previewData.conclusionValue : "";

  const data = {
    title: articleTitle,
    content: bodyValue,
    tags: ["mail", "good"]
  }

  const addBlogFn = async () => {
    try {
      const req = await addBlog(data) as any;
      if (req?.statusCode === 201) {
        localStorage.removeItem('previewData')
        localStorage.removeItem('bodyImage')
        localStorage.removeItem('headerImage')
      }
      console.log('req', req);
    }
    catch (err) {
      console.log("error calling post", err);
    }
  }

  return (
    <>
      <Flex justify={"space-between"}>
        <Text
          className="mulish"
          fontSize={"1.25rem"}
          fontWeight={600}
          color={"#101828"}
        >
          Preview
        </Text>
        <Btn
          p="10px 16px"
          borderRadius={"8px"}
          bgColor="#2EC4B6"
          color="#fff"
          className="mulish"
          fontWeight={500}
          fontSize={".875rem"}
          onClick={addBlogFn}
        >
          Publish
        </Btn>
      </Flex>
      <Flex gap="7px" align={"center"}>
        <Flex>
          <BackIcon />
          <Box ml="-15px">
            <BackIcon />
          </Box>
        </Flex>
        <Text
          className="mulish"
          color={"#FF382B"}
          fontWeight={500}
          fontSize={"1rem"}
          textDecor={"underline"}
          cursor={"pointer"}
          onClick={() => router.push("/blog/add")}
        >
          Back to edit
        </Text>
      </Flex>
      <Box my="20px">
        {headerImage && <Img src={headerImage} alt="header-img" w="full" />}

        <Box
          bgColor={"rgba(243, 121, 32, 0.10)"}
          py={"39px"}
          textAlign={"center"}
        >
          <Text
            fontWeight={700}
            className="mulish"
            color={"#4D4D4D"}
            fontSize={"1.5rem"}
          >
            Areas and Aspect of Real Estate
          </Text>
          <Text
            fontWeight={400}
            className="mulish"
            color={"#9D9D9E"}
            fontSize={".99rem"}
          >
            March 10, 2024
          </Text>
        </Box>
      </Box>
      <Box mt="50px">
        <Text
          fontWeight={700}
          className="mulish"
          color={"#303030"}
          fontSize={"1.5rem"}
        >
          Introduction:
        </Text>
        <Text
          fontWeight={400}
          className="mulish"
          color={"#4D4D4D"}
          fontSize={"1rem"}
          dangerouslySetInnerHTML={{ __html: introValue }}
        />
      </Box>
      <Box mt="30px">
        <Text
          fontWeight={700}
          className="mulish"
          color={"#303030"}
          fontSize={"1.5rem"}
        >
          {articleTitle}
        </Text>
        <Text
          fontWeight={400}
          className="mulish"
          color={"#4D4D4D"}
          fontSize={"1rem"}
          dangerouslySetInnerHTML={{ __html: bodyValue }}
        />
      </Box>
      <Box my="30px">
        {bodyImage && (
          <Img src={bodyImage} alt="header-img" w="full" borderRadius={"6px"} />
        )}
      </Box>
      <Box mt="50px">
        <Text
          fontWeight={700}
          className="mulish"
          color={"#303030"}
          fontSize={"1.5rem"}
        >
          Conclusion
        </Text>
        <Text
          fontWeight={400}
          className="mulish"
          color={"#4D4D4D"}
          fontSize={"1rem"}
          dangerouslySetInnerHTML={{ __html: conclusionValue }}
        />
      </Box>
      <Flex justify={'end'}>
        <Btn
          p="10px 16px"
          borderRadius={"8px"}
          bgColor="#2EC4B6"
          color="#fff"
          className="mulish"
          fontWeight={500}
          fontSize={".875rem"}
          onClick={addBlogFn}
        >
          Publish
        </Btn>
      </Flex>
    </>
  );
};

const Preview = () => {
  return (
    <Wrapper>
      <PreviewBlog />
    </Wrapper>
  );
};

export default Preview;
